import SwiftUI
import Foundation

struct ArticleRow: View {
    let article: Article

    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            VStack(alignment: .leading, spacing: 4) {
                HStack(spacing: 4) {
                    if article.isLive {
                        Text("LIVE")
                            .font(.caption2)
                            .bold()
                            .padding(4)
                            .background(Color.red)
                            .foregroundColor(.white)
                            .cornerRadius(3)
                    }
                    if article.isTrending {
                        Text("TRENDING")
                            .font(.caption2)
                            .bold()
                            .padding(4)
                            .background(Color.orange)
                            .foregroundColor(.white)
                            .cornerRadius(3)
                    }
                }
                Text(article.title)
                    .font(.headline)
                Text(article.summary)
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .lineLimit(3)
                HStack(spacing: 4) {
                    Text(article.source)
                    Text("•")
                    Text(article.publishedDate)
                }
                .font(.caption)
                .foregroundColor(.secondary)
            }
            if let url = article.imageUrl, let imgUrl = URL(string: url) {
                AsyncImage(url: imgUrl) { image in
                    image.resizable().aspectRatio(contentMode: .fill)
                } placeholder: {
                    Color.gray.opacity(0.3)
                }
                .frame(width: 80, height: 80)
                .clipped()
            }
        }
        .padding(.vertical, 8)
    }
}
