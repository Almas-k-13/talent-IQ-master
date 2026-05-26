import { Link, useLocation } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { LayoutDashboard, Code2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function Navbar() {
  const location = useLocation();

  const navItems = [
    {
      name: "Problems",
      path: "/problems",
      icon: <Code2 size={18} />,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
  ];

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 backdrop-blur-2xl border-b border-white/10 bg-[#0b1120]/70"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/dashboard"
            className="flex items-center gap-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/20">
              <Sparkles className="text-black" size={22} />
            </div>

            <div>
              <h1 className="text-xl font-black tracking-tight">
                Talent IQ
              </h1>

              <p className="text-sm text-gray-400">
                Code Together
              </p>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-3">
            {navItems.map((item) => {
              const active =
                location.pathname === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative px-5 py-3 rounded-2xl flex items-center gap-2 text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "bg-green-500 text-black shadow-lg shadow-green-500/20"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}

            {/* User */}
            <div className="ml-2">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-11 h-11 ring-2 ring-green-500/20",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;