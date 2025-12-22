import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />,
)
