import React from "react";

const YourComponent = () => {
    return (
        <section className="container mx-auto p-10 md:py-20 px-0 md:p-10 md:px-0">
            <section className=" flex p-5 md:p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 items-start ">
                <article className="p-5 transform duration-300 hover:-translate-y-1 cursor-pointer hover:shadow-2xl group custom-cursor-on-hover">
                    <div className="relative max-h-125 overflow-hidden">
                        <img
                            className="absolute"
                            src="/img/bryan2.jpeg"
                            alt="asu"/>
                        <img
                            className="relative transform duration-500 group-hover:opacity-0"
                            src="/img/bryan1.jpeg"
                            alt="io"
                        />
                    </div>
                    <div className="p-4 absolute bg-gray-200 rounded-full top-10 right-10 transform duration-500 opacity-0 group-hover:opacity-100">
                        <a target="_blank" href="https://www.instagram.com/looyaaa__/">
                            <svg className="w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"stroke="rgba(0,0,0,0.5)">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" ></path>
                            </svg>
                        </a>
                    </div>
                    <ul className="mt-6 font-semibold text-gray-500">
                        <li className="inline mr-3 pb-1 border-b-2 border-green-500">BRYAN</li>
                        <li className="inline mr-3 pb-1 border-b-2 border-green-500">BACKEND</li>
                    </ul>
                    <p className="mt-6 text-xl leading-relaxed text-gray-700">
                        <a
                            href="https://github.com/HaiPigGi"
                            target="_blank"
                            className="underline"
                            style={{ color: 'rgb(75, 192, 192)', borderColor: 'rgb(75, 192, 192)' }}
                            onMouseOver={(e) => (e.target.style.color = 'rgb(147, 197, 253)')}
                            onMouseOut={(e) => (e.target.style.color = 'rgb(75, 192, 192)')}
                        >
                            GITHUB - HaiPigGi
                        </a>
                    </p>



                    {/* <p className="text-gray-400 mt-10 font-semibold">23rd March, 2021</p> */}
                </article>

                <article className="p-5 transform duration-300 hover:-translate-y-1 cursor-pointer hover:shadow-2xl group custom-cursor-on-hover">
                    <div className="relative max-h-125 overflow-hidden">
                        <img
                            className="absolute"
                            src="/img/y1.JPG"
                            alt="asu"/>
                        <img
                            className="relative transform duration-500 group-hover:opacity-0"
                            src="/img/y2.JPG"
                            alt="io"
                        />
                    </div>
                    <div className="p-4 absolute bg-gray-200 rounded-full top-10 right-10 transform duration-500 opacity-0 group-hover:opacity-100">
                        <a target="_blank" href="https://www.instagram.com/johanesyogtann/">
                            <svg className="w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"stroke="rgba(0,0,0,0.5)">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" ></path>
                            </svg>
                        </a>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <ul className="mt-10 font-semibold text-gray-500">
                        <li className="inline mr-3 pb-1 border-b-2 border-green-500">YOGTAN</li>
                        <li className="inline mr-3 pb-1 border-b-2 border-green-500">BACKEND</li>
                    </ul>
                    <p className="mt-6 text-xl leading-relaxed text-gray-700">
                <a href="https://github.com/yogtan" 
                        target="_blank" 
                        className="underline"
                        style={{ color: 'rgb(75, 192, 192)', borderColor: 'rgb(75, 192, 192)' }}
                            onMouseOver={(e) => (e.target.style.color = 'rgb(147, 197, 253)')}
                            onMouseOut={(e) => (e.target.style.color = 'rgb(75, 192, 192)')}>
                            
                        GITHUB - yogtan
                    </a>
                </p>
                    {/* <p className="text-gray-400 mt-10 font-semibold">23rd March, 2021</p> */}
                </article>

                <article className="p-5 transform duration-300 hover:-translate-y-1 cursor-pointer hover:shadow-2xl group custom-cursor-on-hover">
                    <div className="relative max-h-125 overflow-hidden">
                        <img
                            className="absolute"
                            src="/img/frans2.jpeg"
                            alt="asu"/>
                        <img
                            className="relative transform duration-500 group-hover:opacity-0"
                            src="/img/frans1.jpg"
                            alt="io"
                        />
                    </div>
                    <div className="p-4 absolute bg-gray-200 rounded-full top-10 right-10 transform duration-500 opacity-0 group-hover:opacity-100">
                        <a target="_blank" href="#">
                            <svg className="w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"stroke="rgba(0,0,0,0.5)">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" ></path>
                            </svg>
                        </a>
                    </div>
                    <ul className="mt-6 font-semibold text-gray-500">
                        <li className="inline mr-3 pb-1 border-b-2 border-green-500">FRANS</li>
                        <li className="inline mr-3 pb-1 border-b-2 border-green-500">DATABASE</li>
                    </ul>
                    <p className="mt-6 text-xl leading-relaxed text-gray-700">
                <a href="https://github.com/wleowleo" 
                        target="_blank" 
                        className="underline"
                        style={{ color: 'rgb(75, 192, 192)', borderColor: 'rgb(75, 192, 192)' }}
                            onMouseOver={(e) => (e.target.style.color = 'rgb(147, 197, 253)')}
                            onMouseOut={(e) => (e.target.style.color = 'rgb(75, 192, 192)')}>
                    GITHUB - wleowleo
                </a>
                </p>
                    {/* <p className="text-gray-400 mt-10 font-semibold">23rd March, 2021</p> */}
                </article>

                <article className="p-5 transform duration-300 hover:-translate-y-1 cursor-pointer hover:shadow-2xl group custom-cursor-on-hover">
                    <div className="relative max-h-125 overflow-hidden">
                        <img
                            className="absolute"
                            src="/img/j1.JPG"
                            alt="asu"/>
                        <img
                            className="relative transform duration-500 group-hover:opacity-0"
                            src="/img/j2.JPG"
                            alt="io"
                        />
                    </div>
                    <div className="p-4 absolute bg-gray-200 rounded-full top-10 right-10 transform duration-500 opacity-0 group-hover:opacity-100">
                        <a target="_blank" href="https://www.instagram.com/saya_jeffannnnnnnnnnnnnnnnn/">
                            <svg className="w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"stroke="rgba(0,0,0,0.5)">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" ></path>
                            </svg>
                        </a>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <ul className="mt-6 font-semibold text-gray-500">
                        <li className="inline mr-3 pb-1 border-b-2 border-green-500">JEFFAN</li>
                        <li className="inline mr-3 pb-1 border-b-2 border-green-500">FRONTEND</li>
                    </ul>
                    <p className="mt-6 text-xl leading-relaxed text-gray-700">
                <a href="https://github.com/jheffanD" 
                target="_blank" 
                className="underline"
                style={{ color: 'rgb(75, 192, 192)', borderColor: 'rgb(75, 192, 192)' }}
                            onMouseOver={(e) => (e.target.style.color = 'rgb(147, 197, 253)')}
                            onMouseOut={(e) => (e.target.style.color = 'rgb(75, 192, 192)')}>
                    GITHUB - jheffanD
                </a>
                </p>
                    {/* <p className="text-gray-400 mt-10 font-semibold">23rd March, 2021</p> */}
                </article>

                <article className="p-5 transform duration-300 hover:-translate-y-1 cursor-pointer hover:shadow-2xl group custom-cursor-on-hover">
                    <div className="relative max-h-125 overflow-hidden">
                        <img
                            className="absolute"
                            src="/img/abdi1.jpeg"
                            alt="asu"/>
                        <img
                            className="relative transform duration-500 group-hover:opacity-0"
                            src="/img/abdi2.jpeg"
                            alt="io"
                        />
                    </div>
                    <div className="p-4 absolute bg-gray-200 rounded-full top-10 right-10 transform duration-500 opacity-0 group-hover:opacity-100">
                        <a target="_blank" href="https://www.instagram.com/abdisavia_/">
                            <svg className="w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"stroke="rgba(0,0,0,0.5)">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" ></path>
                            </svg>
                        </a>
                    </div>
                    <ul className="mt-6 font-semibold text-gray-500">
                        <li className="inline mr-3 pb-1 border-b-2 border-green-500">ABDI</li>
                        <li className="inline mr-3 pb-1 border-b-2 border-green-500">FRONTEND</li>
                    </ul>
                    <p className="mt-6 text-xl leading-relaxed text-gray-700">
                <a href="https://github.com/abdisavia" 
                    target="_blank" 
                    className="underline"
                    style={{ color: 'rgb(75, 192, 192)', borderColor: 'rgb(75, 192, 192)' }}
                            onMouseOver={(e) => (e.target.style.color = 'rgb(147, 197, 253)')}
                            onMouseOut={(e) => (e.target.style.color = 'rgb(75, 192, 192)')}>
                        GITHUB - abdisavia
                </a>
                </p>
                    {/* <p className="text-gray-400 mt-10 font-semibold">23rd March, 2021</p> */}
                </article>
            </section>
        </section>
    );
};

export default YourComponent;