import { useQuery } from "@tanstack/react-query";
import { nationalityService } from "../../../../API/Services/nationalityService";
import { teamService } from "../../../../API/Services/teamService";
import { QUERY_CONFIG } from "../../../../Constants/queryConfig";
import { QUERY_KEYS } from "../../../../Constants/queryKeys";
import type { NationalityDTO } from "../../../../types/Nationality/NationalityDTO";
import type { TeamOptions } from "../../../../types/Team/TeamOptions";

/**
 * Custom hook to fetch and manage teams and nationalities data
 * Separates data fetching logic from component (SRP)
 *
 * @returns Object containing teams, nations, loading state, and error state
 */
export const useDriverFormData = () => {
  // Fetch nationalities
  const {
    data: nations,
    isLoading: isLoadingNations,
    error: nationsError,
  } = useQuery<NationalityDTO[]>({
    queryKey: QUERY_KEYS.NATIONALITIES.LIST,
    queryFn: nationalityService.getAll,
    staleTime: QUERY_CONFIG.STALE_TIME.MEDIUM,
  });

  // Fetch teams
  const {
    data: teams,
    isLoading: isLoadingTeams,
    error: teamsError,
  } = useQuery<TeamOptions[]>({
    queryKey: QUERY_KEYS.TEAMS.OPTIONS,
    queryFn: teamService.getOptions,
    staleTime: QUERY_CONFIG.STALE_TIME.MEDIUM,
  });

  return {
    nations: nations ?? [],
    teams: teams ?? [],
    isLoading: isLoadingNations || isLoadingTeams,
    error: nationsError || teamsError,
  };
};
