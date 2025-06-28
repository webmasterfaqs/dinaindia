import SwiftUI

struct CategoryTabs: View {
    @Binding var selected: Category

    var body: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                ForEach(Category.allCases) { category in
                    Button(action: { selected = category }) {
                        Text(category.label)
                            .font(.subheadline)
                            .padding(.vertical, 8)
                            .padding(.horizontal, 12)
                            .background(selected == category ? Color.gray.opacity(0.2) : Color.clear)
                            .cornerRadius(8)
                            .foregroundColor(selected == category ? .primary : .secondary)
                    }
                }
            }
            .padding(.horizontal)
        }
    }

}
