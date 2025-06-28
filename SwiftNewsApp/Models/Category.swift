import Foundation

enum Category: String, CaseIterable, Identifiable {
    case top, world, politics, science, tech

    var id: String { rawValue }

    var label: String {
        switch self {
        case .top: return "Top News"
        case .world: return "World"
        case .politics: return "Politics"
        case .science: return "Science"
        case .tech: return "Tech"
        }
    }
}
