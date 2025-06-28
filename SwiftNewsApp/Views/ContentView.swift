import SwiftUI

enum Screen: Hashable {
    case home, sections, bookmarks, profile
}

struct ContentView: View {
    @State private var selectedTab: Screen = .home
    @StateObject private var viewModel = NewsViewModel()

    var body: some View {
        TabView(selection: $selectedTab) {
            homeView
                .tabItem { Label("Home", systemImage: "house") }
                .tag(Screen.home)
            sectionsView
                .tabItem { Label("Sections", systemImage: "square.grid.2x2") }
                .tag(Screen.sections)
            bookmarksView
                .tabItem { Label("Bookmarks", systemImage: "bookmark") }
                .tag(Screen.bookmarks)
            profileView
                .tabItem { Label("Profile", systemImage: "person") }
                .tag(Screen.profile)
        }
    }

    private var homeView: some View {
        NavigationView {
            List {
                breakingNewsBanner
                if viewModel.selectedCategory == .top {
                    featured
                }
                ForEach(viewModel.articlesByCategory[viewModel.selectedCategory] ?? []) { article in
                    ArticleRow(article: article)
                }
            }
            .listStyle(.plain)
            .navigationTitle("The Times")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Picker("Category", selection: $viewModel.selectedCategory) {
                        ForEach(Category.allCases) { c in
                            Text(c.label).tag(c)
                        }
                    }
                    .pickerStyle(.segmented)
                }
            }
        }
    }

    private var sectionsView: some View {
        NavigationView {
            Text("Sections")
                .navigationTitle("Sections")
        }
    }

    private var bookmarksView: some View {
        NavigationView {
            Text("Bookmarks")
                .navigationTitle("Bookmarks")
        }
    }

    private var profileView: some View {
        NavigationView {
            Text("Profile")
                .navigationTitle("Profile")
        }
    }

    private var breakingNewsBanner: some View {
        HStack {
            Text("BREAKING")
                .font(.caption).bold()
                .padding(.horizontal, 6)
                .padding(.vertical, 2)
                .background(Color.red)
                .foregroundColor(.white)
                .cornerRadius(4)
            Text(viewModel.breakingNews)
                .font(.caption)
        }
        .padding(.vertical, 4)
    }

    private var featured: some View {
        VStack(alignment: .leading) {
            AsyncImage(url: URL(string: viewModel.featuredArticle.imageUrl)) { image in
                image.resizable().aspectRatio(contentMode: .fill)
            } placeholder: {
                Color.gray.opacity(0.3)
            }
            .frame(height: 200)
            .clipped()

            if viewModel.featuredArticle.isLive {
                Text("LIVE")
                    .font(.caption).bold()
                    .padding(6)
                    .background(Color.red)
                    .foregroundColor(.white)
                    .cornerRadius(4)
                    .offset(x: 16, y: -24)
            }

            VStack(alignment: .leading, spacing: 4) {
                Text(viewModel.featuredArticle.title)
                    .font(.title2).bold()
                Text(viewModel.featuredArticle.summary)
                    .font(.body)
                HStack(spacing: 4) {
                    Text(viewModel.featuredArticle.source).font(.caption)
                    Text("•")
                    Text(viewModel.featuredArticle.publishedDate).font(.caption)
                }
                .foregroundColor(.secondary)
            }
            .padding(.horizontal)
            .padding(.bottom)
        }
    }
}
