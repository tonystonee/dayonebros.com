export type VideoThumbnail = {
  url: string
}

export type VideoThumbnails = {
  medium: VideoThumbnail
  maxres?: VideoThumbnail
}

export type VideoId = string | { videoId: string }

export type VideoItem = {
  id: VideoId
  title: string
  channelTitle: string
  description: string
  thumbnails: VideoThumbnails
  active?: boolean
  publishedAt?: string
  channelId?: string
}
