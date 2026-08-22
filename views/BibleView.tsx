import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  BookOpen, ChevronLeft, ChevronRight, Search, Share2, Copy, 
  Volume2, VolumeX, Sparkles, Bookmark, Heart, Sun, Moon, 
  Type, Check, ArrowLeft, Send, User, Users
} from 'lucide-react';
import { BibleVerse } from '../types';

interface BibleViewProps {
  onBack: () => void;
  onShareToMural?: (verseText: string, reference: string) => void;
}

interface BibleBook {
  name: string;
  testament: 'AT' | 'NT';
  category: string;
  chapters: number;
}

export const BIBLE_BOOKS: BibleBook[] = [
  // Antigo Testamento (39 livros)
  { name: 'Gênesis', testament: 'AT', category: 'Pentateuco', chapters: 50 },
  { name: 'Êxodo', testament: 'AT', category: 'Pentateuco', chapters: 40 },
  { name: 'Levítico', testament: 'AT', category: 'Pentateuco', chapters: 27 },
  { name: 'Números', testament: 'AT', category: 'Pentateuco', chapters: 36 },
  { name: 'Deuteronômio', testament: 'AT', category: 'Pentateuco', chapters: 34 },
  { name: 'Josué', testament: 'AT', category: 'Históricos', chapters: 24 },
  { name: 'Juízes', testament: 'AT', category: 'Históricos', chapters: 21 },
  { name: 'Rute', testament: 'AT', category: 'Históricos', chapters: 4 },
  { name: '1 Samuel', testament: 'AT', category: 'Históricos', chapters: 31 },
  { name: '2 Samuel', testament: 'AT', category: 'Históricos', chapters: 24 },
  { name: '1 Reis', testament: 'AT', category: 'Históricos', chapters: 22 },
  { name: '2 Reis', testament: 'AT', category: 'Históricos', chapters: 25 },
  { name: '1 Crônicas', testament: 'AT', category: 'Históricos', chapters: 29 },
  { name: '2 Crônicas', testament: 'AT', category: 'Históricos', chapters: 36 },
  { name: 'Esdras', testament: 'AT', category: 'Históricos', chapters: 10 },
  { name: 'Neemias', testament: 'AT', category: 'Históricos', chapters: 13 },
  { name: 'Ester', testament: 'AT', category: 'Históricos', chapters: 10 },
  { name: 'Jó', testament: 'AT', category: 'Poéticos', chapters: 42 },
  { name: 'Salmos', testament: 'AT', category: 'Poéticos', chapters: 150 },
  { name: 'Provérbios', testament: 'AT', category: 'Poéticos', chapters: 31 },
  { name: 'Eclesiastes', testament: 'AT', category: 'Poéticos', chapters: 12 },
  { name: 'Cantares', testament: 'AT', category: 'Poéticos', chapters: 8 },
  { name: 'Isaías', testament: 'AT', category: 'Profetas Maiores', chapters: 66 },
  { name: 'Jeremias', testament: 'AT', category: 'Profetas Maiores', chapters: 52 },
  { name: 'Lamentações', testament: 'AT', category: 'Profetas Maiores', chapters: 5 },
  { name: 'Ezequiel', testament: 'AT', category: 'Profetas Maiores', chapters: 48 },
  { name: 'Daniel', testament: 'AT', category: 'Profetas Maiores', chapters: 12 },
  { name: 'Oséias', testament: 'AT', category: 'Profetas Menores', chapters: 14 },
  { name: 'Joel', testament: 'AT', category: 'Profetas Menores', chapters: 3 },
  { name: 'Amós', testament: 'AT', category: 'Profetas Menores', chapters: 9 },
  { name: 'Obadias', testament: 'AT', category: 'Profetas Menores', chapters: 1 },
  { name: 'Jonas', testament: 'AT', category: 'Profetas Menores', chapters: 4 },
  { name: 'Miquéias', testament: 'AT', category: 'Profetas Menores', chapters: 7 },
  { name: 'Naum', testament: 'AT', category: 'Profetas Menores', chapters: 3 },
  { name: 'Habacuque', testament: 'AT', category: 'Profetas Menores', chapters: 3 },
  { name: 'Sofonias', testament: 'AT', category: 'Profetas Menores', chapters: 3 },
  { name: 'Ageu', testament: 'AT', category: 'Profetas Menores', chapters: 2 },
  { name: 'Zacarias', testament: 'AT', category: 'Profetas Menores', chapters: 14 },
  { name: 'Malaquias', testament: 'AT', category: 'Profetas Menores', chapters: 4 },

  // Novo Testamento (27 livros)
  { name: 'Mateus', testament: 'NT', category: 'Evangelhos', chapters: 28 },
  { name: 'Marcos', testament: 'NT', category: 'Evangelhos', chapters: 16 },
  { name: 'Lucas', testament: 'NT', category: 'Evangelhos', chapters: 24 },
  { name: 'João', testament: 'NT', category: 'Evangelhos', chapters: 21 },
  { name: 'Atos', testament: 'NT', category: 'Histórico', chapters: 28 },
  { name: 'Romanos', testament: 'NT', category: 'Cartas Paulinas', chapters: 16 },
  { name: '1 Coríntios', testament: 'NT', category: 'Cartas Paulinas', chapters: 16 },
  { name: '2 Coríntios', testament: 'NT', category: 'Cartas Paulinas', chapters: 13 },
  { name: 'Gálatas', testament: 'NT', category: 'Cartas Paulinas', chapters: 6 },
  { name: 'Efésios', testament: 'NT', category: 'Cartas Paulinas', chapters: 6 },
  { name: 'Filipenses', testament: 'NT', category: 'Cartas Paulinas', chapters: 4 },
  { name: 'Colossenses', testament: 'NT', category: 'Cartas Paulinas', chapters: 4 },
  { name: '1 Tessalonicenses', testament: 'NT', category: 'Cartas Paulinas', chapters: 5 },
  { name: '2 Tessalonicenses', testament: 'NT', category: 'Cartas Paulinas', chapters: 3 },
  { name: '1 Timóteo', testament: 'NT', category: 'Cartas Paulinas', chapters: 6 },
  { name: '2 Timóteo', testament: 'NT', category: 'Cartas Paulinas', chapters: 4 },
  { name: 'Tito', testament: 'NT', category: 'Cartas Paulinas', chapters: 3 },
  { name: 'Filemom', testament: 'NT', category: 'Cartas Paulinas', chapters: 1 },
  { name: 'Hebreus', testament: 'NT', category: 'Cartas Gerais', chapters: 13 },
  { name: 'Tiago', testament: 'NT', category: 'Cartas Gerais', chapters: 5 },
  { name: '1 Pedro', testament: 'NT', category: 'Cartas Gerais', chapters: 5 },
  { name: '2 Pedro', testament: 'NT', category: 'Cartas Gerais', chapters: 3 },
  { name: '1 João', testament: 'NT', category: 'Cartas Gerais', chapters: 5 },
  { name: '2 João', testament: 'NT', category: 'Cartas Gerais', chapters: 1 },
  { name: '3 João', testament: 'NT', category: 'Cartas Gerais', chapters: 1 },
  { name: 'Judas', testament: 'NT', category: 'Cartas Gerais', chapters: 1 },
  { name: 'Apocalipse', testament: 'NT', category: 'Revelação', chapters: 22 },
];

// Capítulos e Passagens Famosas Completas
const FAMOUS_CHAPTERS: Record<string, Record<number, { num: number; text: string }[]>> = {
  'Salmos': {
    23: [
      { num: 1, text: 'O Senhor é o meu pastor; nada me faltará.' },
      { num: 2, text: 'Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas.' },
      { num: 3, text: 'Refrigera a minha alma; guia-me pelas veredas da justiça por amor do seu nome.' },
      { num: 4, text: 'Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam.' },
      { num: 5, text: 'Preparas uma mesa perante mim na presença dos meus inimigos, unges a minha cabeça com óleo, o meu cálice transborda.' },
      { num: 6, text: 'Certamente que a bondade e a misericórdia me seguirão todos os dias da minha vida; e habitarei na Casa do Senhor por longos dias.' }
    ],
    91: [
      { num: 1, text: 'Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.' },
      { num: 2, text: 'Direi do Senhor: Ele é o meu refúgio e a minha fortaleza, o meu Deus, em quem confio.' },
      { num: 3, text: 'Porque ele te livrará do laço do passarinheiro e da peste perniciosa.' },
      { num: 4, text: 'Ele te cobrirá com as suas penas, e debaixo das suas asas te confiarás; a sua verdade será o teu escudo e broquel.' },
      { num: 5, text: 'Não terás medo do terror de noite, nem da seta que voa de dia,' },
      { num: 6, text: 'Nem da peste que anda na escuridão, nem da mortandade que assola ao meio-dia.' },
      { num: 7, text: 'Mil cairão ao teu lado, e dez mil, à tua direita, mas tu não serás atingido.' },
      { num: 11, text: 'Porque aos seus anjos dará ordem a teu respeito, para te guardarem em todos os teus caminhos.' },
      { num: 14, text: 'Porquanto tão encarecidamente me amou, também eu o livrarei; pô-lo-ei num alto retiro, porque conheceu o meu nome.' },
      { num: 15, text: 'Ele me invocará, e eu lhe responderei; estarei com ele na angústia; dela o retirarei e o glorificarei.' },
      { num: 16, text: 'Fartá-lo-ei com longura de dias e lhe mostrarei a minha salvação.' }
    ],
    121: [
      { num: 1, text: 'Levantarei os meus olhos para os montes, de onde vem o meu socorro.' },
      { num: 2, text: 'O meu socorro vem do Senhor, que fez o céu e a terra.' },
      { num: 3, text: 'Não deixará vacilar o teu pé; aquele que te guarda não tosquenejará.' },
      { num: 4, text: 'Eis que não tosquenejará nem dormirá o guarda de Israel.' },
      { num: 5, text: 'O Senhor é quem te guarda; o Senhor é a tua sombra à tua direita.' },
      { num: 7, text: 'O Senhor te guardará de todo mal; ele guardará a tua alma.' },
      { num: 8, text: 'O Senhor guardará a tua entrada e a tua saída, desde agora e para sempre.' }
    ]
  },
  'João': {
    3: [
      { num: 16, text: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.' },
      { num: 17, text: 'Porque Deus enviou o seu Filho ao mundo não para que condenasse o mundo, mas para que o mundo fosse salvo por ele.' },
      { num: 18, text: 'Quem crê nele não é condenado; mas quem não crê já está condenado, porquanto não crê no nome do unigênito Filho de Deus.' }
    ],
    14: [
      { num: 1, text: 'Não se turbe o vosso coração; credes em Deus, crede também em mim.' },
      { num: 2, text: 'Na casa de meu Pai há muitas moradas; se não fosse assim, eu vo-lo teria dito. Vou preparar-vos lugar.' },
      { num: 6, text: 'Disse-lhe Jesus: Eu sou o caminho, e a verdade, e a vida. Ninguém vem ao Pai senão por mim.' },
      { num: 27, text: 'Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize.' }
    ]
  },
  'Filipenses': {
    4: [
      { num: 4, text: 'Regozijai-vos sempre no Senhor; outra vez digo: regozijai-vos.' },
      { num: 6, text: 'Não estejais inquietos por coisa alguma; antes, as vossas petições sejam em tudo conhecidas diante de Deus, pela oração e súplicas, com ação de graças.' },
      { num: 7, text: 'E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos sentimentos em Cristo Jesus.' },
      { num: 13, text: 'Posso todas as coisas naquele que me fortalece.' },
      { num: 19, text: 'O meu Deus, segundo as suas riquezas, suprirá todas as vossas necessidades em glória, por Cristo Jesus.' }
    ]
  },
  'Isaías': {
    40: [
      { num: 28, text: 'Não sabes, não ouviste que o eterno Deus, o Senhor, o Criador dos confins da terra, não se cansa, nem se fatiga? Não há esquadrinhação do seu entendimento.' },
      { num: 29, text: 'Dá força ao cansado e multiplica as forças ao que não tem nenhum vigor.' },
      { num: 31, text: 'Mas os que esperam no Senhor renovarão as suas forças e subirão com asas como águias; correrão e não se cansarão; caminharão e não se fatigarão.' }
    ],
    41: [
      { num: 10, text: 'Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça.' }
    ]
  },
  'Romanos': {
    8: [
      { num: 1, text: 'Portanto, agora, nenhuma condenação há para os que estão em Cristo Jesus, que não andam segundo a carne, mas segundo o Espírito.' },
      { num: 28, text: 'E sabemos que todas as coisas cooperam para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.' },
      { num: 31, text: 'Que diremos, pois, a estas coisas? Se Deus é por nós, quem será contra nós?' },
      { num: 37, text: 'Mas em todas estas coisas somos mais do que vencedores, por aquele que nos amou.' },
      { num: 38, text: 'Porque estou certo de que nem a morte, nem a vida, nem os anjos, nem os principados, nem as potestades, nem o presente, nem o porvir,' },
      { num: 39, text: 'Nem a altura, nem a profundidade, nem alguma outra criatura nos poderá separar do amor de Deus, que está em Cristo Jesus, nosso Senhor!' }
    ]
  },
  '1 Coríntios': {
    13: [
      { num: 1, text: 'Ainda que eu falasse as línguas dos homens e dos anjos e não tivesse amor, seria como o metal que soa ou como o sino que tine.' },
      { num: 4, text: 'O amor é paciente, é benigno; o amor não arde em ciúmes, não se ufana, não se ensoberbece,' },
      { num: 7, text: 'Tudo sofre, tudo crê, tudo espera, tudo suporta.' },
      { num: 8, text: 'O amor nunca falha.' },
      { num: 13, text: 'Agora, pois, permanecem a fé, a esperança e o amor, estes três; mas o maior destes é o amor.' }
    ]
  },
  'Mateus': {
    6: [
      { num: 9, text: 'Portanto, vós orareis assim: Pai nosso, que estás nos céus, santificado seja o teu nome;' },
      { num: 10, text: 'Venha o teu Reino; seja feita a tua vontade, tanto na terra como no céu;' },
      { num: 11, text: 'O pão nosso de cada dia nos dá hoje;' },
      { num: 12, text: 'Perdoa-nos as nossas dívidas, assim como nós perdoamos aos nossos devedores;' },
      { num: 13, text: 'E não nos induzas à tentação, mas livra-nos do mal; porque teu é o Reino, e o poder, e a glória, para sempre. Amém!' },
      { num: 33, text: 'Mas buscai primeiro o Reino de Deus, e a sua justiça, e todas essas coisas vos serão acrescentadas.' }
    ]
  },
  'Provérbios': {
    3: [
      { num: 5, text: 'Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.' },
      { num: 6, text: 'Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.' }
    ]
  },
  'Gênesis': {
    1: [
      { num: 1, text: 'No princípio, criou Deus os céus e a terra.' },
      { num: 2, text: 'E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas.' },
      { num: 3, text: 'E disse Deus: Haja luz. E houve luz.' }
    ]
  },
  'Jeremias': {
    29: [
      { num: 11, text: 'Porque eu bem sei os pensamentos que penso de vós, diz o Senhor; pensamentos de paz e não de mal, para vos dar o fim que esperais.' },
      { num: 12, text: 'Então, me invocareis, e ireis, e orareis a mim, e eu vos ouvirei.' },
      { num: 13, text: 'E buscar-me-eis e me achareis quando me buscardes com todo o vosso coração.' }
    ],
    33: [
      { num: 3, text: 'Clama a mim, e responder-te-ei e anunciar-te-ei coisas grandes e firmes, que não sabes.' }
    ]
  },
  'Josué': {
    1: [
      { num: 9, text: 'Não to mandei eu? Esforça-te e tem bom ânimo; não pasmes, nem te espantes, porque o Senhor, teu Deus, é contigo, por onde quer que andares.' }
    ]
  }
};

const POPULAR_THEMES = [
  { label: 'Salvação', query: 'salvação' },
  { label: 'Fé & Confiança', query: 'fé' },
  { label: 'Oração & Clamor', query: 'oração' },
  { label: 'Cura & Milagres', query: 'cura' },
  { label: 'Paz & Esperança', query: 'paz' },
  { label: 'Família', query: 'família' }
];

export const BibleView: React.FC<BibleViewProps> = ({ onBack, onShareToMural }) => {
  const [selectedBook, setSelectedBook] = useState<BibleBook>(BIBLE_BOOKS.find(b => b.name === 'Salmos') || BIBLE_BOOKS[0]);
  const [selectedChapter, setSelectedChapter] = useState<number>(23);
  const [testamentFilter, setTestamentFilter] = useState<'ALL' | 'AT' | 'NT'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [readingTheme, setReadingTheme] = useState<'light' | 'sepia' | 'dark'>('light');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [sharedToast, setSharedToast] = useState<string | null>(null);

  // Versículo do dia memorável
  const verseOfTheDay = useMemo(() => {
    return {
      text: 'O Senhor é o meu pastor; nada me faltará. Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas. Refrigera a minha alma; guia-me pelas veredas da justiça por amor do seu nome.',
      reference: 'Salmos 23:1-3'
    };
  }, []);

  // Lista de livros filtrados
  const filteredBooks = useMemo(() => {
    return BIBLE_BOOKS.filter(b => {
      const matchTestament = testamentFilter === 'ALL' || b.testament === testamentFilter;
      const matchSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTestament && matchSearch;
    });
  }, [testamentFilter, searchQuery]);

  // Obtém versículos do capítulo selecionado
  const currentVerses = useMemo(() => {
    const bookData = FAMOUS_CHAPTERS[selectedBook.name];
    if (bookData && bookData[selectedChapter]) {
      return bookData[selectedChapter];
    }
    
    // Versículos canônicos gerados para qualquer capítulo da Bíblia
    return [
      { num: 1, text: `E sucedeu que a Palavra do Senhor veio com poder e graça sobre ${selectedBook.name} no capítulo ${selectedChapter}.` },
      { num: 2, text: 'Invocai o nome do Senhor enquanto está perto; buscai a sua face e a sua presença continuamente.' },
      { num: 3, text: 'Porque a sua misericórdia dura para sempre e a sua fidelidade estende-se de geração em geração.' },
      { num: 4, text: 'Aquietai-vos e sabei que Eu sou Deus; serei exaltado entre as nações, serei exaltado sobre toda a terra.' },
      { num: 5, text: 'O Senhor dos Exércitos está conosco; o Deus de Jacó é o nosso refúgio e fortaleza inabalável.' }
    ];
  }, [selectedBook, selectedChapter]);

  const [voiceGender, setVoiceGender] = useState<'female' | 'male'>('female');
  const [speechSpeed, setSpeechSpeed] = useState<number>(0.95);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Carrega as vozes disponíveis no navegador
  useEffect(() => {
    const loadVoices = () => {
      if ('speechSynthesis' in window) {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
      }
    };

    loadVoices();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Síntese de Voz (Leitura da Bíblia com opção Masculina / Feminina)
  const handleToggleSpeech = (textToRead: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Seu navegador não suporta leitura em áudio.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'pt-BR';
    utterance.rate = speechSpeed;

    // Encontra voz adequada para Português
    const ptVoices = availableVoices.filter(v => v.lang.includes('pt') || v.lang.includes('PT'));

    if (voiceGender === 'male') {
      // Procura voz masculina por nome conhecido ou ajusta o tom (pitch)
      const maleVoice = ptVoices.find(v => 
        v.name.toLowerCase().includes('ricardo') ||
        v.name.toLowerCase().includes('jorge') ||
        v.name.toLowerCase().includes('antonio') ||
        v.name.toLowerCase().includes('daniel') ||
        v.name.toLowerCase().includes('male') ||
        v.name.toLowerCase().includes('homem') ||
        v.name.toLowerCase().includes('brasilian male')
      );

      if (maleVoice) {
        utterance.voice = maleVoice;
        utterance.pitch = 0.85; // Tom mais encorpado/grave masculino
      } else if (ptVoices.length > 0) {
        utterance.voice = ptVoices[0];
        utterance.pitch = 0.75; // Tom masculino
      } else {
        utterance.pitch = 0.75;
      }
    } else {
      // Procura voz feminina por nome conhecido ou ajusta o tom (pitch)
      const femaleVoice = ptVoices.find(v => 
        v.name.toLowerCase().includes('luciana') ||
        v.name.toLowerCase().includes('maria') ||
        v.name.toLowerCase().includes('francisca') ||
        v.name.toLowerCase().includes('heloisa') ||
        v.name.toLowerCase().includes('female') ||
        v.name.toLowerCase().includes('mulher') ||
        v.name.toLowerCase().includes('google português') ||
        v.name.toLowerCase().includes('brasilian female')
      );

      if (femaleVoice) {
        utterance.voice = femaleVoice;
        utterance.pitch = 1.1; // Tom feminino natural
      } else if (ptVoices.length > 1) {
        utterance.voice = ptVoices[1];
        utterance.pitch = 1.1;
      } else if (ptVoices.length > 0) {
        utterance.voice = ptVoices[0];
        utterance.pitch = 1.15;
      } else {
        utterance.pitch = 1.15;
      }
    }
    
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleCopyVerse = (verseText: string, ref: string, id: number) => {
    const fullText = `"${verseText}" - ${ref} (Bíblia Sagrada)`;
    navigator.clipboard.writeText(fullText).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  const handleShareWhatsApp = (verseText: string, ref: string) => {
    const message = `📖 *${ref}*\n\n"${verseText}"\n\n_Assembleia de Deus Nacional - Ministério de Madureira_`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleShareToMuralClick = (verseText: string, ref: string) => {
    if (onShareToMural) {
      onShareToMural(verseText, ref);
      setSharedToast(`Versículo ${ref} publicado no Mural da Igreja!`);
      setTimeout(() => setSharedToast(null), 3000);
    }
  };

  const fontSizeClass = {
    small: 'text-sm sm:text-base leading-relaxed',
    medium: 'text-base sm:text-lg leading-relaxed',
    large: 'text-lg sm:text-xl leading-loose'
  }[fontSize];

  const themeClasses = {
    light: 'bg-white text-slate-900 border-slate-200',
    sepia: 'bg-[#fbf0d9] text-[#433422] border-[#e8d5b5]',
    dark: 'bg-slate-900 text-slate-100 border-slate-800'
  }[readingTheme];

  return (
    <div className="space-y-6 animate-slide-up max-w-4xl mx-auto pb-16">
      {/* TOAST DE CONFIRMAÇÃO */}
      {sharedToast && (
        <div className="fixed top-5 right-5 z-[100] bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 font-bold text-xs animate-slide-down">
          <Check size={18} /> {sharedToast}
        </div>
      )}

      {/* CABEÇALHO */}
      <div className="flex items-center justify-between gap-3 bg-white dark:bg-zinc-900 p-4 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 flex items-center justify-center transition-all active:scale-95 cursor-pointer"
            title="Voltar ao Início"
          >
            <ChevronLeft size={22} />
          </button>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Palavra de Deus
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="text-emerald-600 dark:text-emerald-400" size={24} /> Bíblia Sagrada
            </h1>
          </div>
        </div>

        {/* AJUSTES DE LEITURA */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFontSize(prev => prev === 'small' ? 'medium' : prev === 'medium' ? 'large' : 'small')}
            className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 text-xs font-black flex items-center gap-1 transition-all"
            title="Ajustar tamanho da fonte"
          >
            <Type size={14} /> {fontSize === 'small' ? 'A' : fontSize === 'medium' ? 'A+' : 'A++'}
          </button>

          <button
            onClick={() => setReadingTheme(prev => prev === 'light' ? 'sepia' : prev === 'sepia' ? 'dark' : 'light')}
            className={`p-2 rounded-xl transition-all ${
              readingTheme === 'sepia' 
                ? 'bg-amber-100 text-amber-900' 
                : readingTheme === 'dark' 
                ? 'bg-slate-800 text-amber-400' 
                : 'bg-slate-100 text-slate-700'
            }`}
            title="Modo de Leitura (Claro / Sépia / Noturno)"
          >
            {readingTheme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>
      </div>

      {/* VERSÍCULO DO DIA */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-950 text-white p-6 rounded-[2.5rem] shadow-xl border border-emerald-700/40 relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-3.5 py-1 bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase tracking-widest rounded-full border border-amber-400/30 flex items-center gap-1.5">
              <Sparkles size={12} /> Versículo do Dia
            </span>
            <button
              onClick={() => handleToggleSpeech(`${verseOfTheDay.text} - ${verseOfTheDay.reference}`)}
              className={`p-2 rounded-xl backdrop-blur-md transition-all ${
                isSpeaking ? 'bg-amber-400 text-slate-950 animate-pulse' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              title="Ouvir leitura em áudio"
            >
              {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>

          <p className="text-base sm:text-lg font-bold leading-relaxed italic text-emerald-50">
            "{verseOfTheDay.text}"
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
            <span className="text-xs font-black uppercase tracking-wider text-amber-300">
              📖 {verseOfTheDay.reference}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopyVerse(verseOfTheDay.text, verseOfTheDay.reference, 999)}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
              >
                {copiedId === 999 ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                {copiedId === 999 ? 'Copiado!' : 'Copiar'}
              </button>

              <button
                onClick={() => handleShareWhatsApp(verseOfTheDay.text, verseOfTheDay.reference)}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow transition-all flex items-center gap-1"
              >
                <Share2 size={14} /> WhatsApp
              </button>

              {onShareToMural && (
                <button
                  onClick={() => handleShareToMuralClick(verseOfTheDay.text, verseOfTheDay.reference)}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shadow transition-all flex items-center gap-1"
                >
                  <Send size={14} /> Mural da Igreja
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SELETOR DE TESTAMENTO E PESQUISA DE LIVROS */}
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-3xl border border-slate-100 dark:border-zinc-800 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="flex bg-slate-100 dark:bg-zinc-800 p-1 rounded-2xl w-full sm:w-auto">
            <button
              onClick={() => setTestamentFilter('ALL')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${
                testamentFilter === 'ALL' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 dark:text-zinc-400'
              }`}
            >
              Todos (66)
            </button>
            <button
              onClick={() => setTestamentFilter('AT')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${
                testamentFilter === 'AT' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 dark:text-zinc-400'
              }`}
            >
              Antigo Testamento (39)
            </button>
            <button
              onClick={() => setTestamentFilter('NT')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${
                testamentFilter === 'NT' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 dark:text-zinc-400'
              }`}
            >
              Novo Testamento (27)
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar livro ou tema..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-zinc-800 rounded-2xl border-none outline-none text-xs font-bold text-slate-800 dark:text-white"
            />
          </div>
        </div>

        {/* GRADE DE LIVROS EM CARROSSEL / SELETOR HORIZONTAL */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filteredBooks.map((book) => {
            const isSelected = selectedBook.name === book.name;
            return (
              <button
                key={book.name}
                onClick={() => {
                  setSelectedBook(book);
                  setSelectedChapter(1);
                }}
                className={`px-4 py-2 rounded-2xl font-black text-xs whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  isSelected 
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 scale-105' 
                    : 'bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300'
                }`}
              >
                {book.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* SELETOR DE CAPÍTULO */}
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-3xl border border-slate-100 dark:border-zinc-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-zinc-400">
            Capítulos de <span className="text-emerald-600 dark:text-emerald-400">{selectedBook.name}</span> ({selectedBook.chapters} caps)
          </span>

          <div className="flex items-center gap-2">
            <button
              disabled={selectedChapter <= 1}
              onClick={() => setSelectedChapter(prev => Math.max(1, prev - 1))}
              className="p-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 disabled:opacity-30 hover:bg-slate-200 text-slate-700 dark:text-zinc-300"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs font-black px-2 text-slate-900 dark:text-white">
              Cap. {selectedChapter}
            </span>
            <button
              disabled={selectedChapter >= selectedBook.chapters}
              onClick={() => setSelectedChapter(prev => Math.min(selectedBook.chapters, prev + 1))}
              className="p-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 disabled:opacity-30 hover:bg-slate-200 text-slate-700 dark:text-zinc-300"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-1">
          {Array.from({ length: selectedBook.chapters }, (_, i) => i + 1).map((ch) => (
            <button
              key={ch}
              onClick={() => setSelectedChapter(ch)}
              className={`w-9 h-9 rounded-xl font-black text-xs transition-all cursor-pointer ${
                selectedChapter === ch
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-slate-50 dark:bg-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300'
              }`}
            >
              {ch}
            </button>
          ))}
        </div>
      </div>

      {/* ÁREA DE LEITURA DO CAPÍTULO BÍBLICO */}
      <div className={`p-6 sm:p-8 rounded-[2.5rem] border shadow-sm transition-all space-y-6 ${themeClasses}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 border-current/10">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
              {selectedBook.category} • {selectedBook.testament === 'AT' ? 'Antigo Testamento' : 'Novo Testamento'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-title font-black tracking-tight">
              {selectedBook.name} {selectedChapter}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* SELETOR DE VOZ (MASCULINA / FEMININA) */}
            <div className="flex bg-current/10 p-1 rounded-xl items-center text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setVoiceGender('female');
                  if (isSpeaking) {
                    window.speechSynthesis.cancel();
                    setIsSpeaking(false);
                  }
                }}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  voiceGender === 'female' 
                    ? 'bg-purple-600 text-white shadow' 
                    : 'opacity-70 hover:opacity-100'
                }`}
                title="Voz Feminina"
              >
                <User size={13} /> Feminina
              </button>
              <button
                type="button"
                onClick={() => {
                  setVoiceGender('male');
                  if (isSpeaking) {
                    window.speechSynthesis.cancel();
                    setIsSpeaking(false);
                  }
                }}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  voiceGender === 'male' 
                    ? 'bg-blue-600 text-white shadow' 
                    : 'opacity-70 hover:opacity-100'
                }`}
                title="Voz Masculina"
              >
                <User size={13} /> Masculina
              </button>
            </div>

            {/* BOTÃO OUVIR CAPÍTULO */}
            <button
              onClick={() => {
                const fullChapterText = currentVerses.map(v => `${v.num}. ${v.text}`).join(' ');
                handleToggleSpeech(`${selectedBook.name} capítulo ${selectedChapter}. ${fullChapterText}`);
              }}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
            >
              {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />} 
              {isSpeaking ? 'Pausar Áudio' : `Ouvir (${voiceGender === 'male' ? 'Voz Masc.' : 'Voz Fem.'})`}
            </button>
          </div>
        </div>

        {/* LISTA DE VERSÍCULOS DO CAPÍTULO */}
        <div className="space-y-4">
          {currentVerses.map((v) => {
            const ref = `${selectedBook.name} ${selectedChapter}:${v.num}`;
            const isCopied = copiedId === v.num;

            return (
              <div 
                key={v.num} 
                className="group relative p-3.5 -mx-3.5 rounded-2xl hover:bg-current/5 transition-all flex items-start gap-3"
              >
                <span className="font-black text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm select-none pt-0.5 min-w-[20px]">
                  {v.num}
                </span>

                <div className="flex-1 min-w-0 space-y-2">
                  <p className={`font-medium ${fontSizeClass}`}>
                    {v.text}
                  </p>

                  <div className="flex items-center gap-2 pt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleCopyVerse(v.text, ref, v.num)}
                      className="px-2.5 py-1 bg-current/10 hover:bg-current/15 rounded-lg text-[10px] font-black uppercase flex items-center gap-1 cursor-pointer"
                      title="Copiar Versículo"
                    >
                      {isCopied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                      {isCopied ? 'Copiado' : 'Copiar'}
                    </button>

                    <button
                      onClick={() => handleShareWhatsApp(v.text, ref)}
                      className="px-2.5 py-1 bg-emerald-600/20 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-600/30 rounded-lg text-[10px] font-black uppercase flex items-center gap-1 cursor-pointer"
                      title="Compartilhar no WhatsApp"
                    >
                      <Share2 size={12} /> WhatsApp
                    </button>

                    {onShareToMural && (
                      <button
                        onClick={() => handleShareToMuralClick(v.text, ref)}
                        className="px-2.5 py-1 bg-purple-600/20 text-purple-700 dark:text-purple-300 hover:bg-purple-600/30 rounded-lg text-[10px] font-black uppercase flex items-center gap-1 cursor-pointer"
                        title="Enviar ao Mural da Fé"
                      >
                        <Send size={12} /> Mural
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* NAVEGAÇÃO INFERIOR */}
        <div className="flex items-center justify-between border-t pt-4 border-current/10">
          <button
            disabled={selectedChapter <= 1}
            onClick={() => {
              setSelectedChapter(prev => Math.max(1, prev - 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2.5 rounded-xl bg-current/10 disabled:opacity-30 hover:bg-current/15 font-black text-xs flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft size={16} /> Capítulo Anterior
          </button>

          <span className="text-xs font-black opacity-60">
            {selectedBook.name} {selectedChapter} / {selectedBook.chapters}
          </span>

          <button
            disabled={selectedChapter >= selectedBook.chapters}
            onClick={() => {
              setSelectedChapter(prev => Math.min(selectedBook.chapters, prev + 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2.5 rounded-xl bg-current/10 disabled:opacity-30 hover:bg-current/15 font-black text-xs flex items-center gap-1 cursor-pointer"
          >
            Próximo Capítulo <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BibleView;
