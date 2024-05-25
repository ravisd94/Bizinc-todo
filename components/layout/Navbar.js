import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
    <div className="container mx-auto flex justify-between items-center">
      <div className="text-white font-bold text-xl">Next.js App</div>
      <ul className="flex">
        <li className="ml-4">
            <Link className="text-white hover:text-gray-400" href="/">
                Home
            </Link>
        </li>
        <li className="ml-4">
        <Link className="text-white hover:text-gray-400" href="/todo  ">
          ToDO List
          </Link>
        </li>
        <li className="ml-4">
        <Link className="text-white hover:text-gray-400" href="/about">
          About
          </Link>
        </li>
        {/* <li className="ml-4">
        <Link className="text-white hover:text-gray-400" href="/about">
          Contact
            </Link>
        </li> */}
      </ul>
    </div>
  </nav>
  );
};

export default Navbar;
