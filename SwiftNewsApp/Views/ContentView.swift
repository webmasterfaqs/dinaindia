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
                BreakingNewsBanner(message: viewModel.breakingNews)
                    .listRowInsets(EdgeInsets())
                CategoryTabs(selected: $viewModel.selectedCategory)
                    .listRowInsets(EdgeInsets())
                if viewModel.selectedCategory == .top {
                    FeaturedArticleView(article: viewModel.featuredArticle)
                        .listRowInsets(EdgeInsets())
                    SectionHeaderView(title: "Latest News", subtitle: "Stay updated with breaking stories")
                        .listRowInsets(EdgeInsets())
                }
                ForEach(viewModel.articlesByCategory[viewModel.selectedCategory] ?? []) { article in
                    ArticleRow(article: article)
                        .listRowInsets(EdgeInsets())
                }
            }
            .listStyle(.plain)
            .navigationTitle("The Times")
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
}
