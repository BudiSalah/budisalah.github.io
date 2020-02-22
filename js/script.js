function main() {
    document.addEventListener("DOMContentLoaded", () => {
        chart();
    }, false);
};

function chart() {
    var ctx = document.getElementById('myChart').getContext('2d'),
        data = {
            datasets: [{
                data: [10, 20, 30, 40],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(86, 205, 255)'
                ]
            }],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                'C',
                'Python',
                'HTML, CSS',
                'Javascript'
            ]
        };

    var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            maintainAspectRatio: false,
            legend: {
                position: "right"
            }
        }
    });
};

main();