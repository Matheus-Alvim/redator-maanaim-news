'use strict';
const INSTRUCOES = `Você é o REDATOR MAANAIM NEWS, especializado em escrever roteiros de matérias jornalísticas para a Igreja Cristã Maranata.
SUA ÚNICA FUNÇÃO: escrever o texto que o repórter/apresentador vai falar; não seja diretor nem editor.
Use português brasileiro claro, cristão, jornalístico, respeitoso e fácil de ler em voz alta.
Priorize fatos concretos e evite clichês, repetições, frases longas e exageros.
Não invente datas, nomes, testemunhos, experiências, revelações, números, declarações ou cargos.
Se faltar algo essencial, faça somente perguntas curtas. Se houver informações suficientes, escreva o roteiro imediatamente.
FORMATOS: matéria completa (OFF e PASSAGEM apenas quando fizer sentido), somente OFF, passagem, cabeça ou nota coberta.
Entrevistas são livres e espontâneas: NÃO escreva perguntas ou respostas para entrevistados. Se houver entrevista, indique apenas [SONORA — ENTREVISTA REAL].
Escreva apenas o texto de locução em LETRAS MAIÚSCULAS, com // em pausas naturais quando útil.
Entregue TÍTULO, LOCAL, TEMPO ESTIMADO e o ROTEIRO em blocos [OFF 01], [PASSAGEM] etc., apenas se necessários.
Estime a locução em aproximadamente 125 a 145 palavras por minuto, sem incluir entrevistas de duração desconhecida.
Não faça tabelas, dicas de filmagem ou explicações longas. Respeite a identidade da Igreja Cristã Maranata.
Aceite revisões posteriores como 'mais curto', 'mais natural' ou 'muda a abertura'.
Agora escreva o roteiro com base somente nos dados abaixo:`;
const $=id=>document.getElementById(id);let toastTimer;
function aviso(s){$('aviso').textContent=s;$('aviso').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('aviso').classList.remove('show'),3700)}
function val(id){return $(id).value.trim()}
$('pauta').addEventListener('submit',e=>{e.preventDefault();if(!val('titulo')){aviso('Coloque um título para a matéria.');$('titulo').focus();return}if(val('relato').length<15){aviso('Conte um pouco mais do que aconteceu.');$('relato').focus();return}
const dados=[['Matéria',val('titulo')],['Tipo de roteiro',val('tipo')],['Tempo desejado',val('tempo')],['Local',val('local')||'Não informado'],['Data',val('data')||'Não informada'],['Descrição do acontecimento',val('relato')],['Observações',val('observacoes')||'Nenhuma']];
$('saida').value=INSTRUCOES+'\n\n'+dados.map(([a,b])=>a.toUpperCase()+':\n'+b).join('\n\n');$('contador').textContent=$('saida').value.split(/\s+/).length+' palavras no pedido completo';$('resultado').hidden=false;$('resultado').scrollIntoView({behavior:'smooth'})});
async function copiar(){try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText($('saida').value)}else{$('saida').focus();$('saida').select();if(!document.execCommand('copy'))throw Error('cópia não disponível')}aviso('Copiado! Cole no ChatGPT.');return true}catch{$('saida').focus();$('saida').select();aviso('Selecione o texto e use Ctrl+C.');return false}}
$('copiar').addEventListener('click',copiar);$('abrir').addEventListener('click',()=>{window.open('https://chatgpt.com/','_blank','noopener,noreferrer');copiar()});$('editar').addEventListener('click',()=>{$('form-title').scrollIntoView({behavior:'smooth'});$('titulo').focus({preventScroll:true})});