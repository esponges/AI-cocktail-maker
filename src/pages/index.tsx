/* eslint-disable max-len */
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { useState } from "react";

// a list of spirits drinks brand names
const spirits = [
  "Absolut Blue",
  "Baileys",
  "Don Julio Blanco",
  "Glenfiddich",
  "Grey Goose",
  "Jack Daniel's",
  "Johnnie Walker Black Label",
  "Beefeater",
  "Bombay Sapphire",
  "Captain Morgan",
];

const Home: NextPage = () => {
  const [chosenSpirit, setChosenSpirit] = useState<string | undefined>(
    undefined
  );
  const { data, mutateAsync } = api.drinks.create.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChosenSpirit(e.target.value);
  };

  const handleCreateClick = async (
    _e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (chosenSpirit) {
      await mutateAsync({ brand: chosenSpirit });
    }
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          {/* a dropdown with all the available spirits */}
          <div className="relative">
            <select
              onChange={handleChange}
              className="h-12 w-full appearance-none rounded-lg border border-white/10 bg-white/10 pl-4 pr-8 text-base text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              {spirits.map((spirit) => (
                <option key={spirit}>{spirit}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <svg
                className="h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          {/* form to submit the chosen spirit */}
          <button
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={handleCreateClick}
            className="rounded-md border border-white/10 bg-white/10 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-white/10"
          >
            Create Drink
          </button>
          {/* create drink result */}
          {data?.recipe && (
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-2xl font-bold text-white">{data?.recipe}</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
