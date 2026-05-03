import { Router } from 'express';
import { db } from '../db';

const router = Router();

// Download tracking schema (add to your database)
interface DownloadLog {
  id: string;
  app_name: string;
  version: string;
  platform: string; // 'windows', 'mac', 'linux'
  ip_address: string;
  country?: string;
  city?: string;
  user_agent: string;
  referrer?: string;
  downloaded_at: Date;
}

// Track download and redirect to file
router.get('/download/:appName/:version', async (req, res) => {
  const { appName, version } = req.params;
  const platform = req.query.platform as string || 'windows';
  
  try {
    // Get user info
    const ipAddress = req.ip || req.headers['x-forwarded-for'] as string || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';
    const referrer = req.headers['referer'] || req.headers['referrer'] as string;
    
    // Get geographic data (optional - use a service like ipapi.co)
    let geoData = { country: 'unknown', city: 'unknown' };
    try {
      const geoResponse = await fetch(`https://ipapi.co/${ipAddress}/json/`);
      if (geoResponse.ok) {
        const data = await geoResponse.json();
        geoData = {
          country: data.country_name || 'unknown',
          city: data.city || 'unknown'
        };
      }
    } catch (error) {
      console.error('Geo lookup failed:', error);
    }
    
    // Log download to database
    await db.downloads.create({
      app_name: appName,
      version: version,
      platform: platform,
      ip_address: ipAddress,
      country: geoData.country,
      city: geoData.city,
      user_agent: userAgent,
      referrer: referrer,
      downloaded_at: new Date()
    });
    
    // Determine file URL based on app and platform
    const fileUrls: Record<string, Record<string, string>> = {
      'autonestcut': {
        'windows': `/downloads/AutoNestCut_v26_5.rbz`,
        'mac': `/downloads/AutoNestCut_v26_5.rbz`,
        'linux': `/downloads/AutoNestCut_v26_5.rbz`
      },
      'constructlm': {
        'windows': `https://github.com/yourusername/ConstructLM/releases/download/v${version}/ConstructLM-Setup-${version}.exe`,
        'mac': `https://github.com/yourusername/ConstructLM/releases/download/v${version}/ConstructLM-${version}.dmg`,
        'linux': `https://github.com/yourusername/ConstructLM/releases/download/v${version}/ConstructLM-${version}.AppImage`
      }
    };
    
    const downloadUrl = fileUrls[appName.toLowerCase()]?.[platform];
    
    if (!downloadUrl) {
      return res.status(404).json({ error: 'Download not found for ' + appName });
    }
    
    // Redirect to actual file
    res.redirect(302, downloadUrl);
    
  } catch (error) {
    console.error('Download tracking error:', error);
    // Still redirect even if tracking fails
    res.redirect(302, `https://github.com/yourusername/ConstructLM/releases/latest`);
  }
});

// Get download statistics
router.get('/stats/:appName', async (req, res) => {
  const { appName } = req.params;
  const { period = '30d' } = req.query;
  
  try {
    // Calculate date range
    const now = new Date();
    const daysAgo = period === '7d' ? 7 : period === '30d' ? 30 : 365;
    const startDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    
    // Get total downloads
    const totalDownloads = await db.downloads.count({
      where: {
        app_name: appName,
        downloaded_at: { gte: startDate }
      }
    });
    
    // Get downloads by platform
    const byPlatform = await db.downloads.groupBy({
      by: ['platform'],
      where: {
        app_name: appName,
        downloaded_at: { gte: startDate }
      },
      _count: true
    });
    
    // Get downloads by country
    const byCountry = await db.downloads.groupBy({
      by: ['country'],
      where: {
        app_name: appName,
        downloaded_at: { gte: startDate }
      },
      _count: true,
      orderBy: { _count: 'desc' },
      take: 10
    });
    
    // Get downloads by version
    const byVersion = await db.downloads.groupBy({
      by: ['version'],
      where: {
        app_name: appName,
        downloaded_at: { gte: startDate }
      },
      _count: true,
      orderBy: { _count: 'desc' }
    });
    
    // Get daily downloads (last 30 days)
    const dailyDownloads = await db.downloads.groupBy({
      by: ['downloaded_at'],
      where: {
        app_name: appName,
        downloaded_at: { gte: startDate }
      },
      _count: true
    });
    
    res.json({
      app_name: appName,
      period: period,
      total_downloads: totalDownloads,
      by_platform: byPlatform,
      by_country: byCountry,
      by_version: byVersion,
      daily_downloads: dailyDownloads
    });
    
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Get real-time download count
router.get('/count/:appName', async (req, res) => {
  const { appName } = req.params;
  
  try {
    const count = await db.downloads.count({
      where: { app_name: appName }
    });
    
    res.json({ app_name: appName, total_downloads: count });
  } catch (error) {
    console.error('Count error:', error);
    res.status(500).json({ error: 'Failed to fetch count' });
  }
});

export default router;
