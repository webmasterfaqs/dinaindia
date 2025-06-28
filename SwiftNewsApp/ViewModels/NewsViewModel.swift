import Foundation
import Combine

class NewsViewModel: ObservableObject {
    @Published var selectedCategory: Category = .top

    let breakingNews: String
    let featuredArticle: FeaturedArticle
    let articlesByCategory: [Category: [Article]]

    init() {
        breakingNews = "Supreme Court to hear landmark climate change case next month"

        featuredArticle = FeaturedArticle(
            title: "Global Climate Summit Reaches Historic Agreement on Carbon Emissions",
            summary: "World leaders from 195 countries have reached a groundbreaking consensus on reducing carbon emissions by 50% over the next decade, marking the most significant climate action in international history.",
            source: "The Times",
            publishedDate: "2 hours ago",
            imageUrl: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=800&h=400&fit=crop",
            isLive: true
        )

        articlesByCategory = [
            .top: [
                Article(
                    id: 1,
                    title: "Tech Giants Face New Regulatory Challenges in European Markets",
                    summary: "New legislation targeting major technology companies could reshape the digital landscape across Europe, with potential impacts on global operations.",
                    source: "Business Desk",
                    publishedDate: "4 hours ago",
                    imageUrl: "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=300&fit=crop",
                    isLive: false,
                    isTrending: true
                ),
                Article(
                    id: 2,
                    title: "Breakthrough in Quantum Computing Promises Revolutionary Changes",
                    summary: "Scientists at leading research institutions have achieved a major milestone in quantum computing that could accelerate technological advancement.",
                    source: "Science",
                    publishedDate: "6 hours ago",
                    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
                    isLive: false,
                    isTrending: false
                ),
                Article(
                    id: 3,
                    title: "Global Food Security Initiative Launches Across 50 Countries",
                    summary: "A comprehensive program aimed at addressing food insecurity worldwide has been launched with support from international organizations and governments.",
                    source: "World News",
                    publishedDate: "8 hours ago",
                    imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
                    isLive: false,
                    isTrending: false
                )
            ],
            .world: [
                Article(
                    id: 4,
                    title: "European Union Announces New Trade Partnership with Southeast Asia",
                    summary: "Historic agreement aims to boost economic cooperation and sustainable development across regions.",
                    source: "World News",
                    publishedDate: "3 hours ago",
                    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
                    isLive: false,
                    isTrending: false
                ),
                Article(
                    id: 5,
                    title: "Antarctic Research Station Reports Record Ice Sheet Changes",
                    summary: "Scientists document unprecedented changes in polar ice formations with global implications.",
                    source: "Science",
                    publishedDate: "5 hours ago",
                    imageUrl: nil,
                    isLive: false,
                    isTrending: false
                )
            ],
            .politics: [
                Article(
                    id: 6,
                    title: "Congressional Leaders Reach Bipartisan Infrastructure Agreement",
                    summary: "Landmark legislation promises major investments in clean energy and digital connectivity.",
                    source: "Politics",
                    publishedDate: "2 hours ago",
                    imageUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=300&fit=crop",
                    isLive: false,
                    isTrending: false
                )
            ],
            .science: [
                Article(
                    id: 7,
                    title: "New Gene Therapy Shows Promise for Treating Rare Genetic Disorders",
                    summary: "Clinical trials demonstrate significant improvements in patient outcomes using innovative treatment approach.",
                    source: "Health & Science",
                    publishedDate: "4 hours ago",
                    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
                    isLive: false,
                    isTrending: false
                )
            ],
            .tech: [
                Article(
                    id: 8,
                    title: "AI Breakthrough: New Model Achieves Human-Level Performance in Complex Reasoning",
                    summary: "Latest artificial intelligence system demonstrates unprecedented capabilities in problem-solving and analysis.",
                    source: "Technology",
                    publishedDate: "1 hour ago",
                    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
                    isLive: true,
                    isTrending: false
                )
            ]
        ]
    }
}

