import SwiftUI

struct FeaturedArticleView: View {
    let article: FeaturedArticle

    var body: some View {
        VStack(alignment: .leading) {
            AsyncImage(url: URL(string: article.imageUrl)) { image in
                image.resizable().aspectRatio(contentMode: .fill)
            } placeholder: {
                Color.gray.opacity(0.3)
            }
            .frame(height: 200)
            .clipped()

            if article.isLive {
                Text("LIVE")
                    .font(.caption).bold()
                    .padding(6)
                    .background(Color.red)
                    .foregroundColor(.white)
                    .cornerRadius(4)
                    .offset(x: 16, y: -24)
            }

            VStack(alignment: .leading, spacing: 4) {
                Text(article.title)
                    .font(.title2).bold()
                Text(article.summary)
                    .font(.body)
                HStack(spacing: 4) {
                    Text(article.source).font(.caption)
                    Text("•")
                    Text(article.publishedDate).font(.caption)
                }
                .foregroundColor(.secondary)
            }
            .padding(.horizontal)
            .padding(.bottom)
        }
    }
}

#Preview {
    FeaturedArticleView(article: FeaturedArticle(
        title: "Example", summary: "summary", source: "source", publishedDate: "1h", imageUrl: "", isLive: true))
}
