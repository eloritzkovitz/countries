import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { Card, LoadingSpinner, TabControl } from "@components";
import { useAuth } from "@features/user/auth";
import { useUserFriends } from "@features/user/friends/hooks/useUserFriends";
import { useFriendProfiles } from "@features/user/friends/hooks/useFriendProfiles";
import { useMutualFriends } from "@features/user/friends/hooks/useMutualFriends";
import type { UserProfile } from "../../../types";
import { FriendList } from "../../../../friends/components/FriendList";

interface ProfileFriendsTabProps {
  profileUser: UserProfile;
}

export function ProfileFriendsTab({ profileUser }: ProfileFriendsTabProps) {
  const { t } = useTranslation("user");
  const { user: currentUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  // Fetch friends and mutual friends
  const { friendUids, loading: friendsLoading } = useUserFriends(
    profileUser.uid,
  );
  const {
    mutualUids,
    loading: mutualLoading,
    mutualCount,
  } = useMutualFriends(currentUser?.uid, profileUser?.uid);

  // Determine the active tab based on the URL search parameter
  const activeTab = searchParams.get("tab") === "mutual" ? "mutual" : "all";

  // Determine which UIDs to load profiles for based on current tab
  const activeUids = useMemo(() => {
    if (activeTab === "mutual") {
      return mutualUids || [];
    }
    return friendUids || [];
  }, [activeTab, friendUids, mutualUids]);

  // Fetch user profiles for active list
  const { profiles: friendProfiles, loading: profilesLoading } =
    useFriendProfiles(activeUids);

  const isLoading =
    friendsLoading ||
    profilesLoading ||
    (activeTab === "mutual" && mutualLoading);

  // Handle tab change by updating the search parameter
  const handleTabChange = (tab: "all" | "mutual") => {
    if (tab === "all") {
      searchParams.delete("tab");
    } else {
      searchParams.set("tab", "mutual");
    }
    setSearchParams(searchParams, { replace: true });
  };

  // Determine if the current user is viewing their own profile
  const isOwnProfile = currentUser?.uid === profileUser.uid;

  const tabs = [
    {
      value: "all" as const,
      label: `${t("profile.friends.tabs.all", "All friends")} (${friendUids.length})`,
    },
    ...(!isOwnProfile
      ? [
          {
            value: "mutual" as const,
            label: `${t("profile.friends.tabs.mutual", "Mutual friends")} (${mutualCount || 0})`,
          },
        ]
      : []),
  ];

  return (
    <Card className="mt-6">
      <div className="flex items-center justify-between pb-2 mb-4">
        <TabControl
          tabs={tabs}
          activeTab={activeTab}
          onChange={handleTabChange}
        />
      </div>

      {isLoading ? (
        <LoadingSpinner message={t("profile.friends.loading")} />
      ) : (
        <div className="mt-4">
          <FriendList
            profiles={friendProfiles}
            search=""
            isMutualOnly={activeTab === "mutual"}
          />
        </div>
      )}
    </Card>
  );
}
