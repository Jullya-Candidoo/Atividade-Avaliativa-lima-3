google.charts.load('current', { packages: ['geochart', 'corechart'] });

function carregarDadosGraficos() {
    fetch('https://covid19-brazil-api.vercel.app/api/report/v1/countries')
        .then(response => response.json())
        .then(dados => {
            
          const dataMapa = new Array(dados.data.length + 1);
          dataMapa[0] = ['Country', 'Confirmed Cases']; 

           
          let totalConfirmados = 0;
          let totalMortes = 0;
          let totalRecuperados = 0;

            
            for (let i = 0; i < dados.data.length; i++) {
                const casos = dados.data[i];
                dataMapa[i + 1] = [casos.country, casos.confirmed];

                totalConfirmados += casos.confirmed;
                totalMortes += casos.deaths;
                totalRecuperados += casos.recovered;
            }

            
            const dataTableMapa = google.visualization.arrayToDataTable(dataMapa);

           
            const mapChart = new google.visualization.GeoChart(document.getElementById('grafico-mapa'));
            const options = {
            colorAxis: {colors: ['green', 'blue','red','yellow']}
              };
              
            mapChart.draw(dataTableMapa, options);

            
            const dataPizza = google.visualization.arrayToDataTable([
                ['Status', 'Total'],
                ['Confirmados', totalConfirmados],
                ['Recuperados', totalRecuperados],
                ['Mortes', totalMortes]
            ]);

            
            const pieChart = new google.visualization.PieChart(document.getElementById('grafico-pizza'));
            pieChart.draw(dataPizza);

          
});
        
}

  /* Grafico-tabela */
 
  function carregarDadosTabela(dados) {
 fetch('https://covid19-brazil-api.vercel.app/api/report/v1/brazil/20200318') 
  .then(Response => Response.json()) 
  .then(dados => carregarDadosTabela(dados)) 

let linhas = document.getElementById('linhas');
    linhas.innerHTML = '';

    for(let i = 0; i < dados["data"].length; i++){
        let elemento = '<tr>' +
                        
                        '<td>' + dados["data"][i].uf +'</td>' +
                        '<td>' + dados["data"][i].state + '</td>' +
                        '<td>' + dados["data"][i].cases + '</td>' +
                        '<td>' + dados["data"][i].deaths+ '</td>' +
                        '<td>' + dados["data"][i].suspects+ '</td>' +
                        '<td>' + dados["data"][i].refuses+ '</td>' +
'</tr>';
          linhas.innerHTML+= elemento; 
    }
}

document.addEventListener('DOMContentLoaded', function(event) {
  carregarDadosGraficos();
  carregarDadosTabela();
});


 

