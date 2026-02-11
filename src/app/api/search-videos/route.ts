import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { recipeName } = await request.json();

    if (!recipeName) {
      return NextResponse.json({ error: 'Recipe name required' }, { status: 400 });
    }

    const apiKey = process.env.YOUTUBE_API_KEY;

    // If no YouTube API key, return search URL as fallback
    if (!apiKey) {
      const searchQuery = encodeURIComponent(`${recipeName} recipe`);
      return NextResponse.json({
        videos: [
          {
            title: `Search "${recipeName} recipe" on YouTube`,
            channelName: 'YouTube',
            thumbnailUrl: '',
            videoUrl: `https://www.youtube.com/results?search_query=${searchQuery}`,
            viewCount: '',
            duration: '',
          },
        ],
      });
    }

    const searchQuery = encodeURIComponent(`${recipeName} recipe cooking`);
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${searchQuery}&type=video&key=${apiKey}&relevanceLanguage=en&regionCode=IN`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return NextResponse.json({ videos: [] });
    }

    const videos = data.items.map((item: {
      id: { videoId: string };
      snippet: {
        title: string;
        channelTitle: string;
        thumbnails: { medium: { url: string } };
      };
    }) => ({
      title: item.snippet.title,
      channelName: item.snippet.channelTitle,
      thumbnailUrl: item.snippet.thumbnails.medium.url,
      videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      viewCount: '',
      duration: '',
    }));

    return NextResponse.json({ videos });
  } catch (error) {
    console.error('YouTube search error:', error);
    return NextResponse.json({ videos: [] });
  }
}
