import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  ActionButton,
  Card,
  Container,
  LoadingSpinner,
  PageHeader,
  SectionHeader,
  StarRatingInput,
} from "@components";
import { ICONS } from "@constants/icons";
import { useCalendarNavigation } from "@features/calendar/hooks/useCalendarNavigation";
import { usePageTitle } from "@hooks";
import { CategoriesList } from "../../core/components/CategoriesList";
import { ParticipantsList } from "../../core/components/ParticipantsList";
import { TagsList } from "../../core/components/TagsList";
import { TripLocationsList } from "../../core/components/TripLocationsList";
import { TripStatusChip } from "../../core/components/TripStatusChip";
import { useTrips } from "../../core/context/TripsContext";
import { useTripLocations } from "../../core/hooks/useTripLocations";
import { TripModal } from "../../editor/components/TripModal";
import { useTripEditor } from "../../editor/hooks/useTripEditor";

export default function TripDetailsPage() {
  const { openTripInCalendar } = useCalendarNavigation();
  const { trips, loading } = useTrips();
  const { t } = useTranslation("trips");

  const { tripId } = useParams<{ tripId: string }>();
  const trip = trips.find((trip) => trip.id === tripId);

  usePageTitle(trip ? trip.name : t("pageTitle", "Trip Details"));

  const { locations, loading: locationsLoading } = useTripLocations(
    trip?.locationIds ?? [],
  );

  const {
    isOpen: isEditorOpen,
    trip: editingTrip,
    setTrip,
    handleEdit,
    handleSave,
    onClose,
  } = useTripEditor();

  if (loading) {
    return (
      <Container className="mt-12">
        <LoadingSpinner message={t("loading", "Loading trip...")} />
      </Container>
    );
  }

  if (!trip) {
    return (
      <Container className="mt-12">
        <PageHeader
          title={t("notFound", "Trip not found")}
          fallbackPath="/trips"
        />
      </Container>
    );
  }

  const startDate = trip.startDate ? new Date(trip.startDate) : null;
  const endDate = trip.endDate ? new Date(trip.endDate) : null;

  const dateRange =
    startDate && endDate
      ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
      : startDate
        ? startDate.toLocaleDateString()
        : t("common:formatting.date.tbd");

  return (
    <>
      <Container className="mt-12">
        <PageHeader title={t("backToTrips", "Trips")} fallbackPath="/trips" />

        <div className="mx-auto space-y-6">
          {/* Trip header */}
          <Card className="p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  {trip.favorite && (
                    <ICONS.favorite className="h-10 w-10 inline text-danger me-2" />
                  )}

                  <h1 className="text-3xl font-bold tracking-tight">
                    {trip.name}
                  </h1>
                </div>
              </div>

              <div className="flex w-32 flex-col items-stretch gap-2 shrink-0">
                <TripStatusChip status={trip.status} />

                <ActionButton
                  variant="secondary"
                  className="!w-full !rounded-full text-text hover:bg-surface-hover"
                  onClick={() => handleEdit(trip)}
                  icon={<ICONS.edit className="h-4 w-4" />}
                >
                  {t("actions.edit", "Edit trip")}
                </ActionButton>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border pt-5">
              <div className="flex items-center gap-2">
                <ICONS.tripDates className="h-5 w-5" />

                <button
                  type="button"
                  onClick={() => openTripInCalendar(trip.id)}
                  className="mt-1 font-medium hover:!text-info"
                >
                  {dateRange}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <ICONS.tripDuration className="h-5 w-5" />

                <p className="font-medium">
                  {startDate && endDate
                    ? `${trip.fullDays} ${t("modal.details.days", "days")}`
                    : t("common:formatting.date.tbd")}
                </p>
              </div>

              <StarRatingInput value={trip.rating} readOnly />
            </div>
          </Card>

          {/* Details */}
          <Card title={t("modal.tabs.details", "Details")}>
            <SectionHeader>
              {t("modal.details.participants", "Participants")} (
              {trip.participants?.length ?? 0})
            </SectionHeader>
            <ParticipantsList uids={trip.participants ?? []} />

            <SectionHeader
              title={t("modal.details.categories", "Categories")}
            />
            <CategoriesList
              categories={trip.categories ?? []}
              limit={trip.categories?.length}
            />

            <SectionHeader title={t("modal.details.tags", "Tags")} />
            <TagsList tags={trip.tags ?? []} limit={trip.tags?.length} />
          </Card>

          {/* Destinations */}
          <Card title={t("modal.tabs.destinations", "Destinations")}>
            <TripLocationsList
              locations={locations}
              loading={locationsLoading}
            />
          </Card>
        </div>
      </Container>

      {/* Trip editor */}
      {editingTrip && (
        <TripModal
          isOpen={isEditorOpen}
          trip={editingTrip}
          onChange={setTrip}
          onSave={handleSave}
          onClose={onClose}
          isEditing
        />
      )}
    </>
  );
}
