import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  DoughnutController,
  Filler,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PieController,
  PointElement,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';

/**
 * Registers a common Chart.js runtime set for convenience-oriented setups.
 */
export function provideChartDefaults(): void {
  Chart.register(
    BarController,
    LineController,
    PieController,
    DoughnutController,
    RadarController,
    PolarAreaController,
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
    Filler
  );
}
