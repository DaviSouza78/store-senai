import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

export interface Integrante {
  nome: string;
  funcao: string;
  avatar?: string;
}

const integrantes: Integrante[] = [
  { nome: 'Seu Nome', funcao: 'Desenvolvedor Front-End' },
  { nome: 'Integrante 2', funcao: 'Designer UI/UX' },
  { nome: 'Integrante 3', funcao: 'Desenvolvedor Back-End' },
  { nome: 'Integrante 4', funcao: 'Gerente de Projeto' },
];

export default function IntegrantesView() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="p-8"
    >
      {/* Section title */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-2">
          <div className="h-[2px] w-8 bg-neon-teal rounded-full shadow-[0_0_8px_rgba(0,229,204,0.5)]" />
          <h1 className="text-2xl font-bold tracking-[0.2em] text-text-primary uppercase font-[var(--font-family-display)]">
            INTEGRANTES
          </h1>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-neon-teal/30 to-transparent rounded-full" />
        </div>
        <p className="text-xs text-text-muted tracking-wider ml-12">
          EQUIPE RESPONSÁVEL PELO PROJETO
        </p>
      </motion.div>

      {/* Grid of members */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {integrantes.map((membro, index) => (
          <motion.div
            key={membro.nome}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={{ scale: 1.04, zIndex: 10 }}
            className="group"
          >
            <div className="relative rounded-xl overflow-hidden border border-neon-teal/20 bg-lego-card transition-all duration-300 group-hover:border-neon-teal/60 group-hover:shadow-[0_0_20px_rgba(0,229,204,0.15),0_0_40px_rgba(0,229,204,0.05)] p-6 flex flex-col items-center text-center">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neon-teal/30 to-neon-teal/5 border-2 border-neon-teal/30 flex items-center justify-center mb-5 group-hover:border-neon-teal/60 transition-all duration-300 overflow-hidden">
                {membro.avatar ? (
                  <img
                    src={membro.avatar}
                    alt={membro.nome}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Users size={36} className="text-neon-teal/60 group-hover:text-neon-teal transition-colors" />
                )}
              </div>

              {/* Name */}
              <h3 className="text-sm font-bold tracking-[0.1em] text-text-primary font-[var(--font-family-display)] mb-1.5 uppercase">
                {membro.nome}
              </h3>

              {/* Role */}
              <span className="px-3 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase bg-neon-teal/5 text-neon-teal/70 border border-neon-teal/10">
                {membro.funcao}
              </span>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-teal/0 group-hover:border-neon-teal/50 rounded-tl-xl transition-all duration-300" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-teal/0 group-hover:border-neon-teal/50 rounded-tr-xl transition-all duration-300" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-teal/0 group-hover:border-neon-teal/50 rounded-bl-xl transition-all duration-300" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-teal/0 group-hover:border-neon-teal/50 rounded-br-xl transition-all duration-300" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
