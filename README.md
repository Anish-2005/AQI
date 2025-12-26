# AQI Backend API 🌍

A robust Node.js backend API for fetching, processing, and serving Air Quality Index (AQI) data for various cities across India. This API retrieves real-time pollutant data from the Indian government's data portal and calculates AQI values using standard environmental guidelines.

## Features ✨

- **Real-time Data Fetching**: Automatically fetches pollutant data from India's government API
- **AQI Calculation**: Calculates Air Quality Index using standard breakpoints for multiple pollutants
- **Automated Updates**: Hourly cron jobs to keep data fresh and up-to-date
- **RESTful API**: Clean REST endpoints for accessing AQI data and statistics
- **Database Storage**: PostgreSQL integration for persistent data storage
- **Health Monitoring**: Built-in health check endpoints for monitoring
- **CORS Support**: Cross-origin resource sharing for frontend integration
- **Vercel Deployment**: Ready for serverless deployment on Vercel

## Pollutants Monitored 🏭

The API tracks the following air pollutants:
- **PM2.5** - Fine Particulate Matter
- **PM10** - Coarse Particulate Matter  
- **NO2** - Nitrogen Dioxide
- **SO2** - Sulfur Dioxide
- **CO** - Carbon Monoxide
- **OZONE** - Ground-level Ozone
- **NH3** - Ammonia

## API Endpoints 🚀

### Health Check
```
GET /api/health
```
Returns server status and health information.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-07-11T10:30:00.000Z",
  "message": "AQI API Server is running"
}
```

### Get AQI Data
```
GET /api/aqidata
```
Returns comprehensive AQI data for all monitored stations.

**Response:**
```json
[
  {
    "station_id": 1,
    "country": "India",
    "state": "Delhi",
    "city": "New Delhi",
    "station": "IGI Airport",
    "latitude": "28.5562",
    "longitude": "77.1000",
    "aqi_value": 156,
    "last_update": "2025-07-11T10:00:00.000Z"
  }
]
```

### Get Statistics
```
GET /api/stats
```
Returns summary statistics about the monitored data.

**Response:**
```json
{
  "totalStations": 245,
  "lastUpdated": "2025-07-11T10:30:00.000Z",
  "status": "active"
}
```

## Installation & Setup 🛠️

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- Government of India API key for air quality data

### Environment Variables
Create a `.env` file in the backend directory:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/aqi_database

# API Keys
AQI_API_KEY=your_government_api_key_here

# Server Configuration
PORT=8080
NODE_ENV=development
```

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Anish-2005/AQI.git
   cd AQI/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up the database:**
   - Create a PostgreSQL database
   - Update the `DATABASE_URL` in your `.env` file
   - The application will automatically create necessary tables

5. **Start the server:**
   ```bash
   npm start
   ```

The server will start on `http://localhost:8080` (or your specified PORT).

## Project Structure 📁

├── data.js            # Data fetching logic from government API
├── db.js              # Database operations and data storage
├── aqiCalculator.js   # AQI calculation algorithms
├── connection.js      # Database connection configuration
├── package.json       # Dependencies and scripts
├── vercel.json        # Vercel deployment configuration
└── .env               # Environment variables (not in repo)
```

## Key Components 🔧

### Data Fetching (`data.js`)
- Fetches pollutant data from India's government data portal
- Supports multiple pollutant types
- Handles API rate limiting and error recovery

### AQI Calculation (`aqiCalculator.js`)
- Implements standard AQI calculation formulas
- Uses official breakpoints for each pollutant
- Converts pollutant concentrations to AQI values

### Database Management (`db.js`)
- PostgreSQL integration using the `postgres` library
- Handles station data and pollutant measurements
- Optimized queries for performance

### Automated Updates
- Cron job runs every hour (`1 * * * *`)
- Fetches latest data and updates the database
- Logs all operations for monitoring

## Deployment 🚀

### Vercel Deployment
The project is configured for easy deployment on Vercel:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Environment Variables for Production
Make sure to set these in your deployment platform:
- `DATABASE_URL`
- `AQI_API_KEY`
- `NODE_ENV=production`

## Dependencies 📦

- **express** - Web framework
- **cors** - Cross-origin resource sharing
- **postgres** - PostgreSQL client
- **node-cron** - Task scheduling
- **node-fetch** - HTTP requests
- **dotenv** - Environment variable management

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the ISC License.

## Data Source 📊

Air quality data is sourced from the Government of India's Open Data Portal:
- **API**: `https://api.data.gov.in/`
- **Resource**: National Air Quality Monitoring Programme
- **Coverage**: Major cities across India

## Support 💬

For support and questions:
- Create an issue in the GitHub repository
- Check the logs for debugging information
- Ensure all environment variables are properly configured

## Monitoring 📈

The API includes built-in monitoring:
- Health check endpoint for uptime monitoring
- Comprehensive logging for debugging
- Error handling with detailed error messages
- Statistics endpoint for data insights

---

**Made with ❤️ for cleaner air monitoring in India**
