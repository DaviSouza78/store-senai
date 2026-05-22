export interface Game {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  franchise: string;
  year: number;
  rating: string;
  tags: string[];
  price?: string;
  priceValue?: number;
  originalPrice?: string;
  discount?: string;
  developer?: string;
  publisher?: string;
  releaseDate?: string;
  platform?: string[];
  features?: string[];
}

// ── Grid Principal ───────────────────────────────────────────
export const featuredGames: Game[] = [
  {
    id: 'resident-evil-requiem',
    title: 'RESIDENT EVIL REQUIEM',
    description:
      'O pesadelo retorna. Enfrente horrores indescritíveis em um mundo aberto devastado por uma nova cepa do T-Virus.',
    longDescription:
      'Resident Evil Requiem redefine o gênero survival horror com uma experiência de mundo aberto sem precedentes.',
    image: '/images/resident-evil.png',
    franchise: 'Capcom',
    year: 2026,
    rating: 'M',
    tags: ['Survival Horror', 'Mundo Aberto', 'Next-Gen'],
    price: 'R$ 349,90',
    priceValue: 349.9,
    originalPrice: 'R$ 399,90',
    discount: '-12%',
    developer: 'Capcom Division 1',
    publisher: 'Capcom',
    releaseDate: '15 de Março, 2026',
    platform: ['PC', 'PS5', 'Xbox Series X|S'],
    features: ['Ray Tracing', '4K HDR', 'Áudio 3D', 'Co-op Online', 'Mundo Aberto'],
  },
  {
    id: 'spiderman-2',
    title: 'SPIDER-MAN 2',
    description:
      'Seja Maior. Juntos. Alterne entre Peter Parker e Miles Morales para proteger Nova York de Venom e Kraven.',
    longDescription:
      'Marvel\'s Spider-Man 2 eleva a franquia a novos patamares com ação e mundo aberto épicos.',
    image: 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=800&q=80',
    franchise: 'Insomniac / PlayStation',
    year: 2025,
    rating: 'T',
    tags: ['Ação', 'Aventura', 'Mundo Aberto'],
    price: 'R$ 349,90',
    priceValue: 349.9,
    originalPrice: 'R$ 399,90',
    discount: '-12%',
    developer: 'Insomniac Games',
    publisher: 'Sony Interactive Entertainment',
    releaseDate: '20 de Outubro, 2025',
    platform: ['PS5', 'PC'],
    features: ['Ray Tracing', '4K 60fps', 'DualSense Háptico', 'Carregamento Instantâneo'],
  },
  {
    id: 'arc-raiders',
    title: 'ARC RAIDERS',
    description:
      'A humanidade revida. Junte-se em um shooter cooperativo contra uma ameaça mecanizada implacável vinda do espaço.',
    longDescription:
      'Arc Raiders é um shooter cooperativo em terceira pessoa ambientado em uma Terra devastada por máquinas alienígenas.',
    image: '/images/arc-raiders.png',
    franchise: 'Embark Studios',
    year: 2026,
    rating: 'T',
    tags: ['Shooter Co-op', 'Sci-Fi', 'PvE'],
    price: 'R$ 249,90',
    priceValue: 249.9,
    originalPrice: 'R$ 299,90',
    discount: '-16%',
    developer: 'Embark Studios',
    publisher: 'Nexon',
    releaseDate: '8 de Junho, 2026',
    platform: ['PC', 'PS5', 'Xbox Series X|S'],
    features: ['Co-op 4 Jogadores', 'Cross-Play', 'Raids', 'Mundo Persistente'],
  },
  // ── Jogos populares da Steam ──────────────────────────────
  {
    id: 'elden-ring',
    title: 'ELDEN RING',
    description:
      'Explore as Terras Intermédias em um vasto RPG de ação criado por Hidetaka Miyazaki e George R.R. Martin.',
    longDescription:
      'Elden Ring é um RPG de ação e mundo aberto ambientado em um universo criado por Hidetaka Miyazaki e George R.R. Martin. Explore reinos fantásticos, enfrente chefes colossais e descubra os segredos do Anel Prístino.',
    image: '/images/elden-ring.png',
    franchise: 'FromSoftware',
    year: 2022,
    rating: 'M',
    tags: ['RPG', 'Ação', 'Mundo Aberto', 'Souls-like'],
    price: 'R$ 199,90',
    priceValue: 199.9,
    originalPrice: 'R$ 249,90',
    discount: '-20%',
    developer: 'FromSoftware',
    publisher: 'Bandai Namco',
    releaseDate: '25 de Fevereiro, 2022',
    platform: ['PC', 'PS5', 'Xbox Series X|S'],
    features: ['Mundo Aberto', 'Multiplayer', 'Ray Tracing'],
  },
  {
    id: 'cyberpunk-2077',
    title: 'CYBERPUNK 2077',
    description:
      'Viva a vida de um mercenário cibernético em Night City, uma megalópole obcecada por poder e modificações corporais.',
    longDescription:
      'Cyberpunk 2077 é um RPG de ação e mundo aberto ambientado em Night City. Assuma o papel de V e explore uma cidade vasta cheia de perigos e oportunidades.',
    image: '/images/cyberpunk-2077.png',
    franchise: 'CD Projekt Red',
    year: 2020,
    rating: 'M',
    tags: ['RPG', 'Mundo Aberto', 'Sci-Fi', 'FPS'],
    price: 'R$ 149,90',
    priceValue: 149.9,
    originalPrice: 'R$ 199,90',
    discount: '-25%',
    developer: 'CD Projekt Red',
    publisher: 'CD Projekt',
    releaseDate: '10 de Dezembro, 2020',
    platform: ['PC', 'PS5', 'Xbox Series X|S'],
    features: ['Ray Tracing', '4K HDR', 'Mundo Aberto', 'Personalização'],
  },
  {
    id: 'god-of-war-ragnarok',
    title: 'GOD OF WAR RAGNARÖK',
    description:
      'Embarque em uma jornada épica com Kratos e Atreus pelos Nove Reinos nórdicos. O Ragnarök está chegando.',
    longDescription:
      'God of War Ragnarök continua a saga de Kratos e Atreus em uma aventura emocionante pelos reinos nórdicos.',
    image: '/images/god-of-war-ragnarok.png',
    franchise: 'Santa Monica Studio',
    year: 2022,
    rating: 'M',
    tags: ['Ação', 'Aventura', 'Hack and Slash'],
    price: 'R$ 249,90',
    priceValue: 249.9,
    originalPrice: 'R$ 299,90',
    discount: '-16%',
    developer: 'Santa Monica Studio',
    publisher: 'Sony Interactive Entertainment',
    releaseDate: '9 de Novembro, 2022',
    platform: ['PS5', 'PC'],
    features: ['4K HDR', 'DualSense Háptico', 'Áudio 3D'],
  },
  {
    id: 'baldurs-gate-3',
    title: "BALDUR'S GATE 3",
    description:
      'Reúna seu grupo e retorne aos Reinos Esquecidos neste RPG épico com narrativa profunda e combate tático.',
    longDescription:
      'Baldur\'s Gate 3 é um RPG baseado em turnos com narrativa rica, escolhas impactantes e combate tático inspirado em D&D 5ª edição.',
    image: '/images/baldurs-gate-3.png',
    franchise: 'Larian Studios',
    year: 2023,
    rating: 'M',
    tags: ['RPG', 'Turnos', 'Co-op', 'Narrativa'],
    price: 'R$ 199,90',
    priceValue: 199.9,
    developer: 'Larian Studios',
    publisher: 'Larian Studios',
    releaseDate: '3 de Agosto, 2023',
    platform: ['PC', 'PS5', 'Xbox Series X|S'],
    features: ['Co-op 4 Jogadores', 'Cross-Save', 'Escolhas Impactantes'],
  },
  {
    id: 'red-dead-redemption-2',
    title: 'RED DEAD REDEMPTION 2',
    description:
      'Uma história épica de lealdade e sobrevivência no coração da América em pleno declínio do Velho Oeste.',
    longDescription:
      'Red Dead Redemption 2 é um épico de mundo aberto que segue Arthur Morgan e a gangue Van der Linde.',
    image: '/images/rdr2.png',
    franchise: 'Rockstar Games',
    year: 2018,
    rating: 'M',
    tags: ['Ação', 'Mundo Aberto', 'Aventura', 'Western'],
    price: 'R$ 119,90',
    priceValue: 119.9,
    originalPrice: 'R$ 239,90',
    discount: '-50%',
    developer: 'Rockstar Games',
    publisher: 'Rockstar Games',
    releaseDate: '5 de Novembro, 2019',
    platform: ['PC', 'PS4', 'Xbox One'],
    features: ['Mundo Aberto', 'Multiplayer Online', 'HDR'],
  },
  {
    id: 'gta-v',
    title: 'GRAND THEFT AUTO V',
    description:
      'Explore Los Santos e Blaine County em uma das maiores experiências de mundo aberto já criadas.',
    longDescription:
      'Grand Theft Auto V oferece três protagonistas jogáveis em uma narrativa entrelaçada de crime e aventura.',
    image: '/images/gta-v.png',
    franchise: 'Rockstar Games',
    year: 2013,
    rating: 'M',
    tags: ['Ação', 'Mundo Aberto', 'Crime', 'Multiplayer'],
    price: 'R$ 79,90',
    priceValue: 79.9,
    originalPrice: 'R$ 119,90',
    discount: '-33%',
    developer: 'Rockstar Games',
    publisher: 'Rockstar Games',
    releaseDate: '14 de Abril, 2015',
    platform: ['PC', 'PS5', 'Xbox Series X|S'],
    features: ['GTA Online', 'Mundo Aberto', '4K 60fps'],
  },
  {
    id: 'the-witcher-3',
    title: 'THE WITCHER 3: WILD HUNT',
    description:
      'Embarque como Geralt de Rívia em uma jornada épica para encontrar sua filha adotiva em um vasto mundo de fantasia.',
    longDescription:
      'The Witcher 3: Wild Hunt é um RPG de mundo aberto aclamado pela crítica com narrativa profunda e combate envolvente.',
    image: '/images/witcher-3.png',
    franchise: 'CD Projekt Red',
    year: 2015,
    rating: 'M',
    tags: ['RPG', 'Mundo Aberto', 'Fantasia', 'Narrativa'],
    price: 'R$ 39,90',
    priceValue: 39.9,
    originalPrice: 'R$ 79,90',
    discount: '-50%',
    developer: 'CD Projekt Red',
    publisher: 'CD Projekt',
    releaseDate: '19 de Maio, 2015',
    platform: ['PC', 'PS5', 'Xbox Series X|S', 'Switch'],
    features: ['Mundo Aberto', 'Ray Tracing', 'Next-Gen Update Grátis'],
  },
  {
    id: 'counter-strike-2',
    title: 'COUNTER-STRIKE 2',
    description:
      'O shooter tático mais icônico do mundo, agora com gráficos renovados e gameplay aprimorado na Source 2.',
    longDescription:
      'Counter-Strike 2 representa a maior evolução técnica da série, com mapas reimaginados e mecânicas refinadas.',
    image: '/images/cs2.png',
    franchise: 'Valve',
    year: 2023,
    rating: 'M',
    tags: ['FPS', 'Tático', 'Competitivo', 'Multiplayer'],
    price: 'GRÁTIS',
    priceValue: 0,
    developer: 'Valve',
    publisher: 'Valve',
    releaseDate: '27 de Setembro, 2023',
    platform: ['PC'],
    features: ['Competitivo', 'Anti-Cheat', 'Source 2', 'Free-to-Play'],
  },
  {
    id: 'hogwarts-legacy',
    title: 'HOGWARTS LEGACY',
    description:
      'Viva sua fantasia de bruxo em Hogwarts no século 1800. Explore, aprenda feitiços e descubra segredos antigos.',
    longDescription:
      'Hogwarts Legacy é um RPG de ação e mundo aberto ambientado no universo de Harry Potter durante o século XIX.',
    image: '/images/hogwarts-legacy.png',
    franchise: 'Avalanche Software',
    year: 2023,
    rating: 'T',
    tags: ['RPG', 'Mundo Aberto', 'Aventura', 'Magia'],
    price: 'R$ 179,90',
    priceValue: 179.9,
    originalPrice: 'R$ 249,90',
    discount: '-28%',
    developer: 'Avalanche Software',
    publisher: 'Warner Bros. Games',
    releaseDate: '10 de Fevereiro, 2023',
    platform: ['PC', 'PS5', 'Xbox Series X|S'],
    features: ['Mundo Aberto', 'Personalização', 'Ray Tracing'],
  },
  {
    id: 'sekiro',
    title: 'SEKIRO: SHADOWS DIE TWICE',
    description:
      'Um shinobi solitário busca vingança no Japão feudal. Desafie inimigos mortais com precisão e habilidade.',
    longDescription:
      'Sekiro: Shadows Die Twice é um jogo de ação e aventura da FromSoftware ambientado no Japão feudal.',
    image: '/images/sekiro.png',
    franchise: 'FromSoftware',
    year: 2019,
    rating: 'M',
    tags: ['Ação', 'Souls-like', 'Ninja', 'Difícil'],
    price: 'R$ 99,90',
    priceValue: 99.9,
    originalPrice: 'R$ 199,90',
    discount: '-50%',
    developer: 'FromSoftware',
    publisher: 'Activision',
    releaseDate: '22 de Março, 2019',
    platform: ['PC', 'PS4', 'Xbox One'],
    features: ['Game of the Year', 'Combate Preciso'],
  },
  {
    id: 'horizon-forbidden-west',
    title: 'HORIZON FORBIDDEN WEST',
    description:
      'Aloy viaja ao Oeste Proibido para investigar uma praga misteriosa e enfrentar máquinas ainda mais perigosas.',
    longDescription:
      'Horizon Forbidden West continua a jornada de Aloy em um mundo pós-apocalíptico cheio de máquinas e mistérios.',
    image: '/images/horizon-fw.png',
    franchise: 'Guerrilla Games',
    year: 2022,
    rating: 'T',
    tags: ['RPG', 'Ação', 'Mundo Aberto', 'Sci-Fi'],
    price: 'R$ 199,90',
    priceValue: 199.9,
    originalPrice: 'R$ 249,90',
    discount: '-20%',
    developer: 'Guerrilla Games',
    publisher: 'Sony Interactive Entertainment',
    releaseDate: '18 de Fevereiro, 2022',
    platform: ['PS5', 'PC'],
    features: ['4K HDR', 'DualSense Háptico', 'Mundo Aberto'],
  },
  {
    id: 'starfield',
    title: 'STARFIELD',
    description:
      'Explore a galáxia em um RPG épico da Bethesda. Mais de 1000 planetas aguardam sua descoberta.',
    longDescription:
      'Starfield é o primeiro novo universo da Bethesda Game Studios em mais de 25 anos.',
    image: '/images/starfield.png',
    franchise: 'Bethesda',
    year: 2023,
    rating: 'M',
    tags: ['RPG', 'Exploração', 'Sci-Fi', 'Mundo Aberto'],
    price: 'R$ 249,90',
    priceValue: 249.9,
    originalPrice: 'R$ 299,90',
    discount: '-16%',
    developer: 'Bethesda Game Studios',
    publisher: 'Bethesda Softworks',
    releaseDate: '6 de Setembro, 2023',
    platform: ['PC', 'Xbox Series X|S'],
    features: ['1000+ Planetas', 'Criação de Naves', 'Mundo Aberto'],
  },
  {
    id: 'palworld',
    title: 'PALWORLD',
    description:
      'Capture criaturas, construa bases e sobreviva em um mundo aberto com elementos de sobrevivência e combate.',
    longDescription:
      'Palworld combina elementos de sobrevivência, construção e captura de criaturas em um mundo aberto massivo.',
    image: '/images/palworld.png',
    franchise: 'Pocketpair',
    year: 2024,
    rating: 'T',
    tags: ['Sobrevivência', 'Mundo Aberto', 'Co-op', 'Crafting'],
    price: 'R$ 74,90',
    priceValue: 74.9,
    developer: 'Pocketpair',
    publisher: 'Pocketpair',
    releaseDate: '19 de Janeiro, 2024',
    platform: ['PC', 'Xbox Series X|S'],
    features: ['Co-op 32 Jogadores', 'Mundo Aberto', 'Base Building'],
  },
  {
    id: 'black-myth-wukong',
    title: 'BLACK MYTH: WUKONG',
    description:
      'Reviva a lenda do Rei Macaco em um RPG de ação soulslike ambientado na mitologia chinesa.',
    longDescription:
      'Black Myth: Wukong é um RPG de ação baseado na clássica lenda chinesa Jornada ao Oeste.',
    image: '/images/black-myth-wukong.png',
    franchise: 'Game Science',
    year: 2024,
    rating: 'M',
    tags: ['RPG', 'Ação', 'Souls-like', 'Mitologia'],
    price: 'R$ 229,90',
    priceValue: 229.9,
    developer: 'Game Science',
    publisher: 'Game Science',
    releaseDate: '20 de Agosto, 2024',
    platform: ['PC', 'PS5'],
    features: ['Unreal Engine 5', 'Ray Tracing', 'Combate Visceral'],
  },
];

// ── Coleção Spider-Man 2 (Nível 2) ────────────────────────────────────
export const spiderMan2Collection: Game[] = [
  {
    id: 'sm2-standard',
    title: 'EDIÇÃO PADRÃO',
    description:
      'A experiência completa do Spider-Man 2. Jogue como Peter e Miles em uma Manhattan massiva de mundo aberto.',
    longDescription:
      'A edição padrão inclui o jogo base completo com toda a campanha principal, atividades de mundo aberto e modo foto.',
    image: 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=800&q=80',
    franchise: 'Insomniac',
    year: 2025,
    rating: 'T',
    tags: ['Jogo Base', 'Digital'],
    price: 'R$ 349,90',
    priceValue: 349.9,
    developer: 'Insomniac Games',
    publisher: 'Sony Interactive Entertainment',
    releaseDate: '20 de Outubro, 2025',
    platform: ['PS5', 'PC'],
  },
  {
    id: 'sm2-deluxe',
    title: 'EDIÇÃO DELUXE',
    description:
      'Inclui o jogo base, 10 trajes bônus, acesso antecipado, molduras exclusivas para o modo foto e o artbook digital.',
    longDescription:
      'Tudo da edição padrão mais conteúdo premium: 10 trajes exclusivos, 3 dias de acesso antecipado e mais.',
    image: 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=800&q=80',
    franchise: 'Insomniac',
    year: 2025,
    rating: 'T',
    tags: ['Conteúdo Bônus', 'Acesso Antecipado'],
    price: 'R$ 449,90',
    priceValue: 449.9,
    originalPrice: 'R$ 499,90',
    discount: '-10%',
    developer: 'Insomniac Games',
    publisher: 'Sony Interactive Entertainment',
    releaseDate: '17 de Outubro, 2025',
    platform: ['PS5', 'PC'],
  },
  {
    id: 'sm2-story-dlc',
    title: 'DLC — A TEIA SOMBRIA',
    description:
      'Expansão standalone. Miles enfrenta uma nova ameaça simbiótica em uma versão distorcida do Harlem.',
    longDescription:
      'Uma nova história épica com 8+ horas de gameplay, novos vilões e uma região inédita.',
    image: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=800&q=80',
    franchise: 'Insomniac',
    year: 2026,
    rating: 'T',
    tags: ['Expansão', 'História', 'Novo Vilão'],
    price: 'R$ 149,90',
    priceValue: 149.9,
    developer: 'Insomniac Games',
    publisher: 'Sony Interactive Entertainment',
    releaseDate: '15 de Março, 2026',
    platform: ['PS5', 'PC'],
  },
  {
    id: 'sm2-new-game-plus',
    title: 'ATUALIZAÇÃO NEW GAME+',
    description:
      'Rejogue toda a campanha com todos os trajes e melhorias desbloqueados. Nova dificuldade heroica.',
    longDescription:
      'Atualização gratuita que adiciona o modo New Game+, dificuldade heroica e 5 missões desafio.',
    image: 'https://images.unsplash.com/photo-1620336655055-088d06e36bf0?w=800&q=80',
    franchise: 'Insomniac',
    year: 2025,
    rating: 'T',
    tags: ['Atualização Gratuita', 'Rejogabilidade'],
    price: 'GRÁTIS',
    priceValue: 0,
    developer: 'Insomniac Games',
    publisher: 'Sony Interactive Entertainment',
    releaseDate: '15 de Dezembro, 2025',
    platform: ['PS5', 'PC'],
  },
  {
    id: 'sm2-symbiote-pack',
    title: 'PACOTE TRAJES SIMBIONTE',
    description:
      'Desbloqueie 5 trajes exclusivos infundidos com simbionte, com habilidades de combate únicas.',
    longDescription:
      '5 trajes simbiontes exclusivos com movimentos de combate e efeitos visuais únicos.',
    image: 'https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=800&q=80',
    franchise: 'Insomniac',
    year: 2025,
    rating: 'T',
    tags: ['Cosmético', 'Pacote de Trajes'],
    price: 'R$ 49,90',
    priceValue: 49.9,
    developer: 'Insomniac Games',
    publisher: 'Sony Interactive Entertainment',
    releaseDate: '1 de Novembro, 2025',
    platform: ['PS5', 'PC'],
  },
  {
    id: 'sm2-ultimate-bundle',
    title: 'PACOTE DEFINITIVO',
    description:
      'O pacote completo: jogo base, extras Deluxe, DLC A Teia Sombria, todos os pacotes de trajes.',
    longDescription:
      'Absolutamente tudo do universo Spider-Man 2 em um único pacote com o melhor custo-benefício.',
    image: 'https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=800&q=80',
    franchise: 'Insomniac',
    year: 2026,
    rating: 'T',
    tags: ['Melhor Valor', 'Completo'],
    price: 'R$ 599,90',
    priceValue: 599.9,
    originalPrice: 'R$ 749,90',
    discount: '-20%',
    developer: 'Insomniac Games',
    publisher: 'Sony Interactive Entertainment',
    releaseDate: '15 de Março, 2026',
    platform: ['PS5', 'PC'],
  },
];

// Helper: find any game by id across all collections
export function findGameById(id: string): Game | undefined {
  return (
    featuredGames.find((g) => g.id === id) ??
    spiderMan2Collection.find((g) => g.id === id)
  );
}
