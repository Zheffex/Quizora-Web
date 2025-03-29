// quizora_api/public/web/js/dash.js
const ctx = document.getElementById('engagementChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Daily Active Users',
            data: [ 1, 2, 3, 4, 5, 6, ,7],
            backgroundColor: 'rgba(45, 160, 181, 0.67)', 
            borderColor: 'rgba(109, 227, 243, 0.674)', 
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            x: {
                ticks: { color: 'white' }, 
                grid: { color: 'rgba(255, 255, 255, 0.2)' } 
            },
            y: {
                ticks: { color: 'white' }, 
                grid: { color: 'rgba(255, 255, 255, 0.2)' } 
            }
        }
    }
});
