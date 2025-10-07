import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineSearch, HiMenu, HiX } from "react-icons/hi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import {HiOutlineUser } from "react-icons/hi2";
import Image from "../assets/logo.png";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/feminina", label: "Feminina" },
    { to: "/masculina", label: "Masculina" },
    { to: "/infantil", label: "Infantil" },
    { to: "/acessorios", label: "Acessórios" },
    { to: "/cosmeticos", label: "Cosméticos e Beleza" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-black text-white px-6 py-3 shadow-md relative z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
        <img
  src={Image}
  alt="Logo MKS"
  className="h-16 w-auto object-contain scale-300 mt-8 ml-10"
/>

        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 justify-center items-center max-w-xl">
          <div className="flex items-center bg-white rounded-full overflow-hidden w-full">
            <HiOutlineSearch className="text-gray-500 text-xl ml-3" />
            <input
              type="text"
              placeholder="O que você procura?..."
              className="flex-1 px-3 py-2 text-gray-700 focus:outline-none"
            />
          </div>
        </div>

        {/* Ícones à direita */}
        <div className="hidden md:flex items-center gap-5 text-2xl">
          <Link to="/carrinho" className="hover:text-gray-300 transition">
            < HiOutlineShoppingBag />
          </Link>
          <Link to="/perfil" className="hover:text-gray-300 transition">
            <  HiOutlineUser />
          </Link>
        </div>

        {/* Botão Mobile */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Links centrais */}
      <ul className="hidden md:flex justify-center gap-10 mt-4 font-medium">
        {navLinks.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={`hover:text-gray-300 ${
                isActive(link.to) ? "text-gray-300" : ""
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <ul className="md:hidden mt-4 flex flex-col items-center gap-3 text-lg font-medium">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="hover:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};
