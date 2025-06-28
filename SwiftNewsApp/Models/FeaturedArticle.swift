import Foundation

struct FeaturedArticle: Identifiable {
    let id = UUID()
    let title: String
    let summary: String
    let source: String
    let publishedDate: String
    let imageUrl: String
    let isLive: Bool
}
