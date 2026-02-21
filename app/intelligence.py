def calculate_technical_score(repo_data):
    language_score = min(repo_data["num_languages"] * 10, 30)
    complexity_score = max(0, 30 - repo_data["avg_function_length"])
    repo_score = min(repo_data["num_repos"] * 5, 20)
    consistency_score = min(repo_data["commit_frequency"] * 2, 20)

    total = language_score + complexity_score + repo_score + consistency_score
    return min(total, 100)


def calculate_cognitive_profile(test):
    analytical = (test["debugging"] + test["optimization"]) / 2
    architectural = (test["system_design"] + test["abstraction"]) / 2
    overall = (analytical + architectural) / 2 * 10

    return {
        "analytical_strength": analytical,
        "architectural_thinking": architectural,
        "overall_cognitive_score": overall
    }


def generate_recommendation(tech_score, cognitive_score):
    if tech_score > 75 and cognitive_score > 75:
        return "AI/ML Engineer or Systems Architect"
    elif tech_score > 70:
        return "Backend Engineer"
    elif cognitive_score > 70:
        return "Product Engineer"
    return "Strengthen fundamentals before specialization"
