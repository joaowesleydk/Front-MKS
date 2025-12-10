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
        { to: "/infantil/body",label: "Body"},
       ,
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
            {localStorage.getItem('token') && localStorage.getItem('profilePhoto') ? (
              <img
                src={localStorage.getItem('profilePhoto')}
                alt="Perfil"
                className="w-8 h-8 rounded-full object-cover border-2 border-white/30"
              />
            ) : (
              <HiOutlineUser />
            )}
          </Link>
          {(() => {
            try {
              return JSON.parse(localStorage.getItem('user') || '{}').role === 'admin';
            } catch (error) {
              console.error('Error parsing user data:', error);
              return false;
            }
          })() && (
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

      {/* Menu Mobile - Sidebar */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="md:hidden fixed inset-0 bg-black/50 z-40" 
            onClick={() => setIsMenuOpen(false)}
          ></div>
          
          {/* Sidebar */}
          <div className="md:hidden fixed top-0 left-0 h-full w-80 bg-black text-white z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto">
            {/* Header do Sidebar */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <img src={Image} alt="Logo MKS" className="h-8 w-auto" />
                <span className="text-xl font-bold">MKS Store</span>
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl hover:text-gray-300 transition-colors"
              >
                <HiX />
              </button>
            </div>
            
            {/* Perfil do usuário */}
            <div className="p-6 border-b border-gray-700">
              <Link
                to={localStorage.getItem('token') ? '/perfil' : '/login'}
                className="flex items-center gap-3 hover:bg-gray-800 p-3 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {localStorage.getItem('token') && localStorage.getItem('profilePhoto') ? (
                  <img
                    src={localStorage.getItem('profilePhoto')}
                    alt="Perfil"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                    <HiOutlineUser className="text-xl" />
                  </div>
                )}
                <div>
                  <p className="font-medium">
                    {localStorage.getItem('token') 
                      ? (() => {
                          try {
                            return JSON.parse(localStorage.getItem('user') || '{}').name || 'Usuário';
                          } catch (error) {
                            console.error('Error parsing user data:', error);
                            return 'Usuário';
                          }
                        })()
                      : 'Fazer Login'
                    }
                  </p>
                  <p className="text-sm text-gray-400">
                    {localStorage.getItem('token') ? 'Ver perfil' : 'Entre na sua conta'}
                  </p>
                </div>
              </Link>
            </div>
            
            {/* Menu de navegação */}
            <div className="p-4">
              {navLinks.map((link) => (
                <div key={`sidebar-${link.id}`} className="mb-2">
                  <details className="group">
                    <summary className="cursor-pointer hover:bg-gray-800 p-3 rounded-lg flex items-center gap-3 transition-colors">
                      {link.icon}
                      <span className="font-medium">{link.label}</span>
                      <span className="ml-auto text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    
                    {link.sub && (
                      <div className="ml-6 mt-2 space-y-1">
                        {link.sub.map((subLink) => (
                          <Link
                            key={subLink.to}
                            to={subLink.to}
                            className="block text-gray-300 hover:text-white hover:bg-gray-800 p-2 rounded-lg transition-colors text-sm"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subLink.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </details>
                </div>
              ))}
            </div>
            
            {/* Ações do usuário */}
            <div className="p-6 border-t border-gray-700 mt-auto">
              <Link
                to="/sacola"
                className="flex items-center gap-3 hover:bg-gray-800 p-3 rounded-lg transition-colors mb-3"
                onClick={(e) => {
                  handleCartClick(e);
                  setIsMenuOpen(false);
                }}
              >
                <HiOutlineShoppingBag className="text-xl" />
                <span>Minha Sacola</span>
                {getItemCount() > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {getItemCount()}
                  </span>
                )}
              </Link>
              
              {(() => {
                try {
                  return JSON.parse(localStorage.getItem('user') || '{}').role === 'admin';
                } catch (error) {
                  console.error('Error parsing user data:', error);
                  return false;
                }
              })() && (
                <Link
                  to="/admin/produtos"
                  className="flex items-center gap-3 hover:bg-red-600 bg-red-500 p-3 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-xl">⚙️</span>
                  <span>Painel Admin</span>
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}  