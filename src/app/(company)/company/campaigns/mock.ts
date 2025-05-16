type CampaignStatus = "active" | "draft" | "cancelled";
type ApplicationStatus = "pending" | "accepted" | "completed" | "rejected";

export type CampaignApplication = {
  id: string;
  status: ApplicationStatus;
  influencerId: string;
  influencerName: string;
  profileImage: string;
  appliedAt: string;
  message?: string;
  followers?: number;
  engagement?: number;
};

export type Campaign = {
  id: string;
  title: string;
  platform: string;
  startDate: string;
  endDate: string;
  draftDeadline: string;
  postDate: string;
  budget: string;
  status: CampaignStatus;
  description?: string;
  requirements?: string[];
  applications: CampaignApplication[];
};

export const mockCampaigns: Campaign[] = [
  {
    id: "1",
    title: "春の新作コスメPRキャンペーン",
    platform: "Instagram",
    status: "active",
    startDate: "2024-04-01",
    endDate: "2024-04-30",
    draftDeadline: "2024-04-10",
    postDate: "2024-04-15",
    budget: "¥50,000",
    description: "春の新作コスメのPRキャンペーンです。",
    requirements: [
      "フォロワー数10,000人以上",
      "化粧品・美容関連の投稿実績があること",
      "20代後半〜30代の女性インフルエンサー",
      "自然光での撮影が可能なこと",
      "PR表記やリンクの掲載に対応可能なこと",
    ],
    applications: [
      {
        id: "app1",
        status: "accepted",
        influencerId: "inf1",
        influencerName: "Beauty Creator",
        profileImage:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
        appliedAt: "2024-03-15",
        message: "美容商品のレビュー経験が豊富です。",
        followers: 15000,
        engagement: 4.5,
      },
      {
        id: "app2",
        status: "pending",
        influencerId: "inf2",
        influencerName: "コスメレビュアー",
        profileImage:
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100",
        appliedAt: "2024-03-16",
        message: "化粧品のレビューを得意としています。",
        followers: 20000,
        engagement: 3.8,
      },
    ],
  },
  {
    id: "2",
    title: "フィットネスドリンク新商品PR",
    platform: "TikTok",
    status: "active",
    startDate: "2024-05-01",
    endDate: "2024-05-31",
    draftDeadline: "2024-05-15",
    postDate: "2024-05-20",
    budget: "¥80,000",
    description: "フィットネスドリンクの新商品のPRキャンペーンです。",
    requirements: [
      "フォロワー数15,000人以上",
      "スポーツ・フィットネス関連の投稿実績があること",
      "週3回以上の運動習慣がある方",
      "商品の効果を体験・実感できる方",
      "#筋トレ や #フィットネス タグの投稿実績があること",
    ],
    applications: [
      {
        id: "app3",
        status: "pending",
        influencerId: "inf3",
        influencerName: "フードブロガー",
        profileImage:
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100",
        appliedAt: "2024-04-18",
        message: "食品のレビュー記事を多数執筆しています。",
        followers: 15000,
        engagement: 3.2,
      },
    ],
  },
  {
    id: "3",
    title: "夏物ファッションアイテムPR",
    platform: "Instagram",
    status: "cancelled",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    draftDeadline: "2024-03-10",
    postDate: "2024-03-15",
    budget: "¥70,000",
    description: "夏物ファッションアイテムのPRキャンペーンです。",
    requirements: [
      "フォロワー数20,000人以上",
      "ファッション関連の投稿が80%以上を占めていること",
      "過去3ヶ月以内の投稿エンゲージメント率3%以上",
      "撮影場所の確保が可能なこと",
      "カジュアルからモード系まで幅広いスタイリングができること",
    ],
    applications: [
      {
        id: "app4",
        status: "completed",
        influencerId: "inf4",
        influencerName: "ファッションブロガー",
        profileImage:
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100",
        appliedAt: "2024-03-02",
        message: "ファッションアイテムのスタイリング投稿を得意としています。",
        followers: 25000,
        engagement: 4.1,
      },
    ],
  },
  {
    id: "4",
    title: "新商品の料理レシピ動画制作",
    platform: "YouTube",
    status: "draft",
    startDate: "2024-04-15",
    endDate: "2024-05-15",
    draftDeadline: "2024-04-25",
    postDate: "2024-05-01",
    budget: "¥100,000",
    description: "新商品の料理レシピ動画制作のPRキャンペーンです。",
    requirements: [
      "チャンネル登録者数5,000人以上",
      "料理関連の動画制作実績が月3本以上あること",
      "調理シーンのクオリティの高い撮影ができること",
      "レシピの考案から撮影・編集まで一貫して対応可能なこと",
      "商品の特徴を活かしたオリジナルレシピの提案ができること",
    ],
    applications: [],
  },
];
