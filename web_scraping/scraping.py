import time
import re
import chromedriver_autoinstaller
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException


def go_through_search_results(search_results, course_table, video_table):
    for course in search_results:
        try:
            general_info = get_course_information(course)
            video_info = get_video_information()

            general_info['available_videos'] = len(video_info['video_number'])
            course_table.append(general_info)
            video_table.append(video_info)
        except Exception as e:
            print(f"Error processing course {course}: {e}")

    return course_table, video_table


def get_course_information(course):
    driver.execute_script("arguments[0].scrollIntoView();", course)
    spans = course.find_elements(By.TAG_NAME, "span")
    regex = re.compile(r'search-result-\d+-title')
    course_title_span = [span for span in spans if span.get_attribute(
        'id') and regex.match(span.get_attribute('id'))]
    if len(course_title_span) != 1:
        raise Exception("Couldn't find the title of the course")

    course_title = course_title_span[0].text
    # Open the link in a new tab
    (ActionChains(driver).key_down(Keys.COMMAND)
     .click(course_title_span[0]).key_up(Keys.COMMAND).perform())

    driver.switch_to.window(driver.window_handles[1])
    time.sleep(1)
    # description_div = driver.find_element(By.ID, "expanded-description")

    try:
        description_div = driver.find_element(By.ID, "expanded-description")
    except NoSuchElementException:
        description_div = driver.find_element(By.ID, "full-description")

    description = driver.execute_script(
        "return arguments[0].innerHTML;", description_div).split("<button ")[0]
    course_url = driver.current_url

    sibling = driver.find_element(
        By.XPATH, '//h5[contains(text(), "Topics")]/following-sibling::*')
    all_links = sibling.find_elements(By.TAG_NAME, 'a')
    topics = [driver.execute_script("return arguments[0].innerText;", link)
              for link in all_links if driver.execute_script("return arguments[0].innerText;", link).strip()]

    return {
        "title": course_title,
        "description": description,
        "course_url": course_url,
        "topics": topics
    }


def get_video_information():
    try:
        # Add as many names as you want
        names = ["Class Videos", "Video Lectures", "Lecture Videos"]
        # Create the XPath string
        xpath_str = ' or '.join(
            f'contains(text(), "{name}")' for name in names)
        # Use the XPath string to find the element
        link = driver.find_element(By.XPATH, f'//a[{xpath_str}]')

        driver.get(link.get_attribute('href'))
        time.sleep(2)
    except Exception as e:
        print("Could not find video lectures for this course.")

    all_videos = driver.find_elements(
        By.CSS_SELECTOR, "#course-content-section>div")

    video_info = {
        "video_titles": [get_video_title(video) for video in all_videos],
        "video_ids": [get_video_id(video) for video in all_videos],
        "video_number": list(range(1, len(all_videos) + 1))
    }

    driver.close()
    driver.switch_to.window(driver.window_handles[0])

    return video_info


def get_video_id(video_card):
    return video_card.find_element(By.CSS_SELECTOR, ".thumbnail").get_attribute("src")[27:38]


def get_video_title(video_card):
    return video_card.find_element(By.CSS_SELECTOR, ".video-title").text


def get_last_10_courses():
    driver.switch_to.window(driver.window_handles[0])
    all_courses = driver.find_elements(
        By.CSS_SELECTOR, ".learning-resource-card")
    return all_courses[-10:]


# go_through_search_results(search_results)
course_table = []
video_table = []

chromedriver_autoinstaller.install()
driver = webdriver.Chrome()

base_url = 'https://ocw.mit.edu/search/?f=Lecture%20Videos&s=department_course_numbers.sort_coursenum'
driver.get(base_url)
while len(course_table) < 242:
    courses = get_last_10_courses()
    course_table, video_table = go_through_search_results(
        courses, course_table, video_table)
    pd.DataFrame(course_table).to_csv(
        f"course_table_{len(course_table)}.csv", index=False)
    pd.DataFrame(video_table).to_csv(
        f"video_table_{len(course_table)}.csv", index=False)

# driver.quit()
