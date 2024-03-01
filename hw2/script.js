document.addEventListener('DOMContentLoaded', function() {
    fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('population-data').getElementsByTagName('tbody')[0];
        const years = [];
        const populations = [];

        data.data.sort((a, b) => a.Year.localeCompare(b.Year)).forEach(item => {
            // Populate table
            let row = tableBody.insertRow();
            let cellYear = row.insertCell(0);
            cellYear.innerHTML = item.Year;
            let cellPopulation = row.insertCell(1);
            cellPopulation.innerHTML = item.Population.toLocaleString();

            // Prepare data for the chart
            years.push(item.Year);
            populations.push(item.Population);
        });

        // Chart
        const ctx = document.getElementById('populationChart').getContext('2d');
        const populationChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [{
                    label: 'Population',
                    data: populations,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'US Population Over Time'
                    },
                    legend: {
                        display: true,
                        position: 'top',
                    }
                }
            }
        });
    });
});

