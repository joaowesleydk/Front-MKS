import { useState, useRef, useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineSearch, HiMenu, HiX } from "react-icons/hi";
import {
  HiOutlineShoppingBag,
  HiOutlineUser,
  HiOutlineSparkles,
  HiOutlineTag,
  HiOutlineGift,
  HiOutlineHeart,
  HiOutlineCube,
  HiOutlineBeaker
} from "react-icons/hi2";
import Image from "../assets/logo.png";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0); 
  const location = useLocation();
  const navRef = useRef(null);

   // Mede a altura real da navbar
   useEffect(() => {
    if (navRef.current) {
      setNavbarHeight(navRef.current.offsetHeight);
    }
  }, [setNavbarHeight]);


  const navLinks = [
    {
      to: "/feminina",
      label: "Feminina",
      icon: <HiOutlineSparkles className="inline-block mr-2 text-pink-400 text-lg " />,
      sub: [
        { to: "/feminina/vestidos", label: "Vestidos" },
        { to: "/feminina/saias", label: "Saias" },
        { to: "/feminina/blusas", label: "Blusas" },
        { to: "/feminina/calcas", label: "Calças" },
        { to: "/feminina/shorts", label: "Shorts" },
        { to: "/feminina/jeans", label: "Jeans" },
        { to: "/feminina/langerie", label: "Lingerie" },
      ],
    },
    {
      to: "/masculina",
      label: "Masculina",
      icon: <HiOutlineTag className="inline-block mr-2 text-blue-400 text-lg" />,
      sub: [
        { to: "/masculina/bermudas", label: "Bermudas" },
        { to: "/masculina/calças", label: "Calças" },
        { to: "/masculina/camisetas", label: "Camisetas" },
        { to: "/masculina/camisas", label: "Camisas" },
        { to: "/masculina/blazers", label: "Blazers" },
        { to: "/masculina/jaquetas", label: "Jaquetas" },
      ]
      ,
    },
    {
      to: "/infantil",
      label: "Infantil",
      icon: <HiOutlineGift className="inline-block mr-2 text-yellow-400 text-lg" />,
      sub: [
        { to: "/infantil/casacos", label: "Casacos" },
        { to: "/infantil/bori", label: "Bori" },
        { to: "/infantil/new born", label: "New Born" },
        { to: "/infantil/fantasias", label: "Fantasias" },
        { to: "/infantil/conjuntos", label: "Conjuntos" },
   

      ],
    },
    {
      to: "/",
      label: "Acessórios",
      icon: <HiOutlineHeart className="inline-block mr-2 text-green-400 text-lg" />,
      sub: [
        { to: "/acessorios/relogio", label: "Relógios" },
        { to: "/acessorios/lacos", label: "Laços" },
        { to: "/acessorios/oculos", label: "Óculos de Sol" },
        { to: "/acessorios/cintos", label: "Cintos" },
        { to: "/acessorios/bolsas", label: "Bolsas" },
        { to: "/acessorios/chapéus", label: "Chapéus" },
        
      ],
    },
    {

      to: "/",

      to: "",

      label: "Cosméticos e Beleza",
      icon: <HiOutlineBeaker className="inline-block mr-2 text-purple-400 text-lg" />,
      sub: [
        { to: "/cosmeticos/hidratantes", label: "Hidratantes" },
        { to: "/cosmeticos/perfumes", label: "Perfumes e Body Splash" },
        { to: "/cosmeticos/maquiagem", label: "Maquiagem" },
        { to: "/cosmeticos/labios", label: "Cuidados com os Lábios" },
        { to: "/cosmeticos/cabelos", label: "Cabelos" },
        { to: "/cosmeticos/banho", label: "Sabonetes e Banho" },

      ],
    },
    {
      to: "/bijuterias",
      label: "Bijuterias",
      icon: <HiOutlineCube className="inline-block mr-2 text-amber-400 text-lg" />,
      sub: [
        { to: "/bijuterias/aneis", label: "Anéis" },
        { to: "/bijuterias/brincos", label: "Brincos" },
        { to: "/bijuterias/pulseiras", label: "Pulseiras" },
        { to: "/bijuterias/colares", label: "Colares" },
        { to: "/bijuterias/tornozeleiras", label: "Tornozeleiras" },
        { to: "/bijuterias/piercings", label: "Piercings" },
        { to: "/bijuterias/conjuntos", label: "Conjuntos" },

      ],
    },
  ];

  const isActive = (path) => location.pathname === path;


return (
  <nav
      ref={navRef}
      className="bg-black text-white px-6 py-4 shadow-md fixed top-0 left-0 w-full z-50"
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={Image}
            alt="Logo MKS"
            className="h-16 w-auto object-contain scale-300 mt-8 ml-10"
          />
        </Link>

        {/* Barra de pesquisa - apenas desktop */}
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

        {/* Ícones à direita - apenas desktop */}
        <div className="hidden md:flex items-center gap-5 text-2xl">
          <Link to="/sacola" className="hover:text-gray-300 transition">
            <HiOutlineShoppingBag />
          </Link>
          <Link to="/login" className="hover:text-gray-300 transition">
            <HiOutlineUser />
          </Link>
        </div>

        {/* Botão Mobile */}
        <button
          className="md:hidden text-3xl absolute right-4 top-1/2 transform -translate-y-1/2 z-40"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Links centrais - DESKTOP */}
      <ul className="hidden md:flex justify-center gap-10 mt-4 font-medium relative">
        {navLinks.map((link) => (
          <li key={link.to} className="group relative">
            <Link
              to={link.to}
              className={`hover:text-gray-300 flex items-center transition ${isActive(link.to) ? "text-gray-300" : ""
                }`}
            >
              {link.icon}
              {link.label}
            </Link>

            {/* Subcategorias */}
            {link.sub && (
              <ul
                className="absolute left-0 mt-2 bg-white text-black rounded-lg shadow-lg opacity-0 invisible 
                group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out transform 
                translate-y-2 group-hover:translate-y-0 overflow-hidden min-w-[160px]"
              >
                {link.sub.map((subLink) => (
                  <li key={subLink.to}>
                    <Link
                      to={subLink.to}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      {subLink.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <ul className="md:hidden mt-4 flex flex-col items-center gap-3 text-lg font-medium bg-black pb-4 rounded-lg relative z-10">
          {navLinks.map((link) => (
            <li key={link.to} className="w-full text-center">
              <details className="group border-b border-gray-700 py-2">
                <summary className="cursor-pointer hover:text-gray-300 flex items-center justify-center gap-2">
                  {link.icon}
                  <span>{link.label}</span>
                  <span className="text-sm text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>

                {link.sub && (
                  <ul
                    className="mt-2 space-y-1 overflow-hidden transition-all duration-500 ease-in-out 
                    max-h-0 group-open:max-h-40"
                  >
                    {link.sub.map((subLink) => (
                      <li key={subLink.to}>
                        <Link
                          to={subLink.to}
                          className="block text-sm text-gray-400 hover:text-white"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subLink.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </details>
            </li>
          ))}

          {/* ÍCONES — só no MOBILE */}
          <li className="flex justify-center gap-6 mt-4 text-3xl border-t border-gray-700 pt-4">
            <Link
              to="/sacola"
              className="hover:text-gray-300 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              <HiOutlineShoppingBag />
            </Link>
            <Link
              to="/login"
              className="hover:text-gray-300 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              <HiOutlineUser />
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}  