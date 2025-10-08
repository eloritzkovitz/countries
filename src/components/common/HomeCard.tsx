import { Link } from "react-router-dom";

export function HomeCard({
  imageSrc,
  imageAlt,
  title,
  description,
  linkTo,
  linkText,
}: {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  linkTo: string;
  linkText: string;
}) {
  return (
    <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full md:w-80">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-full h-40 mb-4 object-cover rounded-lg"
      />
      <h2 className="text-xl font-bold mb-2 text-blue-600 dark:text-gray-200">
        {title}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
        {description}
      </p>
      <Link
        to={linkTo}
        className="px-6 py-3 bg-blue-800 dark:bg-gray-100 text-white dark:text-gray-800 rounded-lg text-lg font-semibold no-underline hover:bg-blue-900 dark:hover:bg-gray-200 transition-colors"
      >
        {linkText}
      </Link>
    </div>
  );
}