import { useState, useRef, useEffect} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { HiOutlineSearch, HiMenu, HiX } from "react-icons/hi";
import toast from 'react-hot-toast';
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
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(null);
  const { getItemCount } = useCart();

  const isLoggedIn = () => {
    return localStorage.getItem('token') && localStorage.getItem('user');
  };

  const handleCartClick = (e) => {
    if (!isLoggedIn()) {
      e.preventDefault();
      toast.error('Você precisa estar logado para acessar a sacola!');
      navigate('/login', { state: { from: 'cart' } });
    }
  };

   // Mede a altura real da navbar
   useEffect(() => {
    if (navRef.current) {
      setNavbarHeight(navRef.current.offsetHeight);
    }
  }, [setNavbarHeight]);


  const navLinks = [
    {
      id: "feminina",
      to: "/",
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
      id: "masculina",
      to: "",
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
      id: "infantil",
      to: "",
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
      id: "acessorios",
      to: "",
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

      id: "cosmeticos e beleza",
      to: "",

      label: "Cosméticos e Beleza",
      icon: <HiOutlineBeaker className="inline-block mr-2 text-purple-400 text-lg" />,
      sub: [
        { to: "/cosmeticos/hidratantes", label: "Hidratantes" },
        { to: "/cosmeticos/perfumes", label: "Perfumes e Body Splash" },
        { to: "/cosmeticos/maquiagem", label: "Maquiagem" },
        { to: "/cosmeticos/banho", label: "Sabonetes e Banho" },

      ],
    },
    {
      id: "bijuterias",
      to: "",
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/pesquisa?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };


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
          <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full overflow-hidden w-full">
            <HiOutlineSearch className="text-gray-500 text-xl ml-3" />
            <input
              type="text"
              placeholder="O que você procura?..."
              className="flex-1 px-3 py-2 text-gray-700 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="sr-only">Pesquisar</button>
          </form>
        </div>

        {/* Ícones à direita - apenas desktop */}
        <div className="hidden md:flex items-center gap-5 text-2xl">
          <Link to="/sacola" onClick={handleCartClick} className="hover:text-gray-300 transition relative">
            <HiOutlineShoppingBag />
            {getItemCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getItemCount()}
              </span>
            )}
          </Link>
          <Link to={localStorage.getItem('token') ? '/perfil' : '/login'} className="hover:text-gray-300 transition">
            <HiOutlineUser />
          </Link>
          {JSON.parse(localStorage.getItem('user') || '{}').role === 'admin' && (
            <Link to="/admin/produtos" className="hover:text-gray-300 transition text-sm bg-red-600 px-2 py-1 rounded">
              Admin
            </Link>
          )}
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
          <li key={link.id} className="group relative">
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
            <li key={`mobile-${link.id}`} className="w-full text-center">
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
              className="hover:text-gray-300 transition relative"
              onClick={(e) => {
                handleCartClick(e);
                setIsMenuOpen(false);
              }}
            >
              <HiOutlineShoppingBag />
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Link>
            <Link
              to={localStorage.getItem('token') ? '/perfil' : '/login'}
              className="hover:text-gray-300 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              <HiOutlineUser />
            </Link>
            {JSON.parse(localStorage.getItem('user') || '{}').role === 'admin' && (
              <Link
                to="/admin/produtos"
                className="hover:text-gray-300 transition text-sm bg-red-600 px-2 py-1 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
}  