import { setTraceId } from "@/helpers";
import type { ILoggingManager } from "@/infra";
import { BaseService, IGithub } from "@/modules/shared";
import type { Commit, ICommit } from ".";

export class CommitService extends BaseService implements ICommit {
  constructor(
    protected readonly logger: ILoggingManager,
    private readonly github: IGithub,
  ) {
    super(logger);
  }

  @setTraceId
  async run({
    userId,
    username,
    token,
  }: Commit.Params): Promise<Commit.Response> {
    this.log("info", "Starting process commit", { username });

    const now = new Date();
    const oneYearAgo = new Date(now);
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const query = `
      query($username: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $username) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }
    `;

    const data = await this.github.graphql<Commit.ContributionsResponse>(
      userId,
      token,
      query,
      {
        username,
        from: oneYearAgo.toISOString(),
        to: now.toISOString(),
      },
    );

    const days =
      data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
        (w) => w.contributionDays,
      );

    const commitsByDay = new Map(
      days.map((d) => [d.date, d.contributionCount]),
    );

    const heatmap = days.map((d) => ({
      date: d.date,
      count: d.contributionCount,
    }));

    const { currentStreak, longestStreak } = this.calculateStreaks({
      commitsByDay,
    });

    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const firstDayOfYear = this.toLocalDateStr(
      new Date(now.getFullYear(), 0, 1),
    );

    const commits30d = heatmap
      .filter((d) => d.date >= this.toLocalDateStr(thirtyDaysAgo))
      .reduce((sum, d) => sum + d.count, 0);

    const totalThisYear = heatmap
      .filter((d) => d.date >= firstDayOfYear)
      .reduce((sum, d) => sum + d.count, 0);

    const sixtyDaysAgo = new Date(now);
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

    const commits30dPrevious = heatmap
      .filter((d) => {
        const date = d.date;
        return (
          date >= this.toLocalDateStr(sixtyDaysAgo) &&
          date < this.toLocalDateStr(thirtyDaysAgo)
        );
      })
      .reduce((sum, d) => sum + d.count, 0);

    const deltaCommits30d =
      commits30dPrevious === 0
        ? null
        : Math.round(
            ((commits30d - commits30dPrevious) / commits30dPrevious) * 100,
          );

    return {
      commits30d,
      deltaCommits30d,
      totalThisYear,
      currentStreak,
      longestStreak,
      heatmap,
    };
  }

  private calculateStreaks({
    commitsByDay,
  }: {
    commitsByDay: Map<string, number>;
  }) {
    const today = new Date();
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    const todayStr = this.toLocalDateStr(today);
    const startOffset = (commitsByDay.get(todayStr) ?? 0) > 0 ? 0 : 1;

    // streak atual — de hoje pra trás, para no primeiro dia sem commit
    for (let i = startOffset; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = this.toLocalDateStr(date);

      if ((commitsByDay.get(dateStr) ?? 0) > 0) {
        currentStreak++;
      } else {
        break;
      }
    }

    // longest streak — itera todos os 365 dias em ordem, não só os com commits
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = this.toLocalDateStr(date);

      if ((commitsByDay.get(dateStr) ?? 0) > 0) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0; // quebra o streak em dias sem commit
      }
    }

    return { currentStreak, longestStreak };
  }

  private toLocalDateStr(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
}
