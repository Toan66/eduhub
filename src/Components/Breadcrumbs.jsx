import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    return (
        <div className="bg-gray-100 text-gray-700">
            <nav aria-label="breadcrumb" className="mx-auto text-lg font-medium container px-4 py-8 sm:max-w-screen-xl">
                <ol className="list-reset flex">
                    <li>
                        <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
                    </li>
                    {pathnames.map((name, index) => {
                        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                        const isLast = index === pathnames.length - 1;
                        return isLast ? (
                            <li className="text-gray-500 mx-2" aria-current="page" key={name}>
                                / <span className="text-gray-500">{name}</span>
                            </li>
                        ) : (
                            <li key={name} className="mx-2">
                                / <Link to={routeTo} className="text-gray-700 hover:text-gray-900">{name}</Link>
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </div>

    );
};

export default Breadcrumbs;