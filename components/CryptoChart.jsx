"use client";

import { useEffect, useState, useRef } from 'react'
import { fetchMarketChart } from '../lib/coingecko'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js'