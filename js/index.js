// Pega o botão de alternância do tema do DOM.
const themeToggle = document.getElementById('theme-toggle');

// Essa função aplica o tema atual e salva a preferência.
function applyTheme(theme) {
  const body = document.body;

  // remove qualquer classe anterior e aplica a nova.
  body.classList.remove('dark-theme', 'light-theme');
  body.classList.add(`${theme}-theme`);

  // o botão não tem texto; a aparência vem dos pseudo-elementos no CSS.
  themeToggle.textContent = '';

  // o atributo data-theme controla o efeito visual do toggle no CSS.
  themeToggle.setAttribute('data-theme', theme);

  // atributo de acessibilidade para indicar estado pressionado.
  themeToggle.setAttribute('aria-pressed', theme === 'dark');

  // persistência entre sessões.
  localStorage.setItem('netflixTheme', theme);
}

// inicializa o tema em carregamento da página.
function initTheme() {
  // tenta restaurar o tema salvo, caso exista
  const savedTheme = localStorage.getItem('netflixTheme');

  // detecta preferência do sistema quando usuário não escolheu ainda.
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // se tiver tema salvo usa ele; senão usa preferência do OS.
  const defaultTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(defaultTheme);
}

// alterna tema a cada clique do botão.
themeToggle.addEventListener('click', () => {
  const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
  const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(nextTheme);
});

// aplica o tema inicial.
initTheme();

// Adiciona event listeners aos perfis para armazenar o perfil ativo no localStorage
document.querySelectorAll('.profile a').forEach(link => {
  link.addEventListener('click', (event) => {
    const figure = link.querySelector('figure');
    const img = figure.querySelector('img');
    const figcaption = figure.querySelector('figcaption');
    
    localStorage.setItem('perfilAtivoNome', figcaption.textContent);
    localStorage.setItem('perfilAtivoImagem', img.src);
  });
});
