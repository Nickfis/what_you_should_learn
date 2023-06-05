import Link from "next/link";

const Header = () => {
  return (
    <nav className="header">
      <ul>
        <li>
          <Link href="/">Top 20</Link>
        </li>
        <li>
          <Link href="/search">Search Courses</Link>
        </li>
        <li>
          <Link href="/outstanding-lectures">Outstanding Lectures</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
