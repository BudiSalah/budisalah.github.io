function main() {
    document.addEventListener("DOMContentLoaded", () => {
        chart();
        
    }, false);
};

function chart() {
    var ctx = document.getElementById('myChart').getContext('2d'),
        data = {
            datasets: [{
                data: [55, 40, 25],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(86, 205, 255)',
                    'rgb(255, 205, 86)'
                ]
            }],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                "Front-End",
                "Web Design",
                "Back-End"
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