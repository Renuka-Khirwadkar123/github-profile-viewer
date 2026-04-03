type User = {
  login: string;
  name: string;
  avatar_url: string;
  followers: number;
  public_repos: number;
  bio?: string;
  location?: string;
  blog?: string;
  company?: string;
  html_url?: string;
};

type Repo = {
  name: string;
  html_url: string;
  description?: string | null;
  stargazers_count: number;
};

// ✅ typed axios
declare const axios: {
  get<T>(url: string): Promise<{ data: T }>;
};

async function handleSearch() {
  const input = document.getElementById("username") as HTMLInputElement;
  const profile = document.getElementById("profile") as HTMLDivElement;

  const username = input.value;

  if (!username) {
    profile.innerHTML = `<div class="profile-card">Enter username</div>`;
    return;
  }

  profile.innerHTML = `<div class="profile-card">Loading...</div>`;

  try {
    const res = await axios.get<User>(
      `https://api.github.com/users/${username}`
    );

    const user = res.data;

    // fetch top public repos (most recently updated)
    let reposHtml = "";
    try {
      const r = await axios.get<Repo[]>(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=8`
      );
      const repos = r.data;
      if (repos && repos.length) {
        reposHtml = `
          <div class="repo-list">
            <h4>Top Repositories</h4>
            <ul>
              ${repos
                .map(
                  (repo) =>
                    `<li><a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a> <span class="muted">• ${repo.stargazers_count}</span>${
                      repo.description
                        ? `<div class="repo-desc">${repo.description}</div>`
                        : ""
                    }</li>`
                )
                .join("")}
            </ul>
          </div>
        `;
      }
    } catch {
      reposHtml = "";
    }

    profile.innerHTML = `
      <div class="profile-card">
        <img src="${user.avatar_url}" alt="${user.login} avatar" />
        <h3>${user.name ?? user.login}</h3>
        <p class="muted">@${user.login}</p>
        ${user.bio ? `<p class="bio">${user.bio}</p>` : ""}
        <p>Followers: ${user.followers} · Repos: ${user.public_repos}</p>
        ${reposHtml}
        <p class="muted small">${user.company ? `${user.company} · ` : ""}${user.location ?? ""}${user.blog ? ` · <a href='${user.blog}' target='_blank' rel='noopener noreferrer'>${user.blog}</a>` : ""}</p>
      </div>
    `;
  } catch {
    profile.innerHTML = `<div class="profile-card">User not found</div>`;
  }
}

document
  .getElementById("searchBtn")
  ?.addEventListener("click", handleSearch);