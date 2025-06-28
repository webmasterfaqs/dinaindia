import SwiftUI

struct SectionHeaderView: View {
    let title: String
    let subtitle: String?

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(title)
                .font(.headline)
            if let subtitle {
                Text(subtitle)
                    .font(.subheadline)
                    .foregroundColor(.secondary)
            }
        }
        .padding(.vertical, 8)
    }
}

#Preview {
    SectionHeaderView(title: "Latest News", subtitle: "Stay updated")
}
