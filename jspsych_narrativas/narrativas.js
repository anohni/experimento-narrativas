const timeline = [];

const instrucoes = {
  type: 'html-keyboard-response',
  stimulus: function() {
    const pages = [
      "<p>Este experimento faz parte de um projeto maior desenvolvido pelo Prof. Miguel Oliveira Jr, da UFAL.</p><p>Seu objetivo é estudar como percebemos possíveis mudanças em narrativas orais.</p>",
      "<p>O estudo está de acordo com as diretrizes éticas e foi submetido à avaliação de comitês apropriados.</p><p>Você poderá sair a qualquer momento. Os dados são anônimos.</p>",
      "<p>Após ouvir um trecho da narrativa, julgue se haverá alguma mudança (de tempo, de personagem, etc.).</p><p>Pressione <strong>F</strong> para mudança e <strong>J</strong> para não mudança.</p>"
    ];
    const currentPage = jsPsych.data.get().last(1).values()[0]?.page || 0;
    return pages[currentPage];
  },
  choices: [' '],
  on_finish: function(data) {
    const nextPage = (data.page || 0) + 1;
    if (nextPage < 3) {
      jsPsych.addNodeToEndOfTimeline(instrucoes, jsPsych.resumeExperiment);
      data.page = nextPage;
    }
  }
};
timeline.push(instrucoes);

const exemplos = [
  { stimulus: 'audio/exemplo01.mp3', label: 'Exemplo 1' },
  { stimulus: 'audio/exemplo04.mp3', label: 'Exemplo 2' }
];

exemplos.forEach(ex => {
  timeline.push({
    type: 'audio-keyboard-response',
    stimulus: ex.stimulus,
    prompt: `<p>${ex.label}: Ouça o áudio. Pressione F para mudança, J para não mudança.</p>`,
    choices: ['f', 'j']
  });
});

const estimulos = [
  'C91.mp3', 'D54.mp3', 'E26.mp3', 'F39.mp3', 'G74.mp3', 'H20.mp3',
  'P88.mp3', 'O99.mp3', 'S60.mp3', 'X41.mp3', 'U30.mp3', 'W92.mp3',
  'O55.mp3', 'P71.mp3', 'Q23.mp3', 'R38.mp3', 'B59.mp3', 'C14.mp3',
  'D63.mp3', 'E24.mp3'
];

const trials = jsPsych.randomization.shuffle(estimulos).map(file => ({
  type: 'audio-keyboard-response',
  stimulus: `audio/${file}`,
  prompt: `<p>Ouça o trecho. Pressione F para mudança, J para não mudança.</p>`,
  choices: ['f', 'j'],
  data: { stimulus_id: file }
}));

timeline.push(...trials);

timeline.push({
  type: 'html-keyboard-response',
  stimulus: '<p>Obrigado por participar do experimento!</p><p>Pressione qualquer tecla para encerrar.</p>',
  choices: jsPsych.ALL_KEYS
});

jsPsych.init({
  timeline: timeline,
  on_finish: function() {
    jsPsych.data.displayData();
  }
});
