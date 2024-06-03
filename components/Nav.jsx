"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
    const isUserLoggedIn = true;

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const setProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }

        setProviders();
    }, []);
    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href='/' className="flex gap-2 flex-center">
                <Image
                    src='/assets/images/logo.svg'
                    alt="Promptopia logo"
                    width={30}
                    height={30}
                    className="object-contain"
                />
                <p className="logo_text"> Promptopia</p>
            </Link>
            {/*desktop navigation*/}
            <div className="sm:flex hidden">
                {isUserLoggedIn ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href='/create-post' className="black_btn"> Create post</Link>
                        <button type="button" onClick={signOut} className="outline_btn"> Sign out</button>
                        <Link href='/profile'>
                            <Image
                                src='/assets/images/logo.svg'
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="profile"
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    key={provider.name}
                                    type="button"
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                ></button>
                            ))}
                    </>
                )
                }
            </div>
            {/* mobile navigation*/}
            <div className="sm:hidden flex relative">
                {isUserLoggedIn ? (
                    <div className="flex">
                        <Image
                            src='/assets/images/logo.svg'
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="profile"
                            onClick={() => setToggleDropdown(!toggleDropdown)}
                        />

                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link href='/profile'
                                    className="dropdown_link text-"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My profile
                                </Link>
                                <Link href='/create-prompt'
                                    className="dropdown_link text-"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    create prompt
                                </Link>
                                <button
                                    type='button'
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                    className='mt-5 w-full black_btn'
                                >
                                    Sign Out
                                </button>


                            </div>
                        )}

                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    key={provider.name}
                                    type="button"
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                ></button>
                            ))}
                    </>
                )
                }

            </div>
        </nav>
    )
}

export default Nav
