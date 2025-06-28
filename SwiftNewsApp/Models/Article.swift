import Foundation

struct Article: Identifiable {
    let id: Int
    let title: String
    let summary: String
    let source: String
    let publishedDate: String
    let imageUrl: String?
    let isLive: Bool
    let isTrending: Bool
}
