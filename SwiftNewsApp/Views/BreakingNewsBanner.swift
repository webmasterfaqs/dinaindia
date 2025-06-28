import SwiftUI

struct BreakingNewsBanner: View {
    let message: String

    var body: some View {
        HStack(spacing: 8) {
            Text("BREAKING")
                .font(.caption).bold()
                .padding(.horizontal, 8)
                .padding(.vertical, 4)
                .background(Color.red)
                .foregroundColor(.white)
                .cornerRadius(4)
            Text(message)
                .font(.caption)
        }
        .padding(.vertical, 4)
    }
}

#Preview {
    BreakingNewsBanner(message: "Supreme Court to hear landmark climate case next month")
}
