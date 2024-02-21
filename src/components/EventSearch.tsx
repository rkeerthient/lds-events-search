import {
  useSearchActions,
  useSearchState,
  SelectableStaticFilter,
  Matcher,
} from "@yext/search-headless-react";
import {
  OnDragHandler,
  ResultsCount,
  AppliedFilters,
  Pagination,
  MapboxMap,
  VerticalResults,
  LocationBias,
  Coordinate,
  MapboxMapProps,
  StandardCard,
  SearchBar,
  Facets,
  StandardFacets,
  ApplyFiltersButton,
} from "@yext/search-ui-react";
import { LngLat, LngLatBounds } from "mapbox-gl";
import * as React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import MapPin from "./MapPin";
import EventCard from "./EventCard";
export interface Location {
  yextDisplayCoordinate?: Coordinate;
}

const mapboxOptions: MapboxMapProps<Location>["mapboxOptions"] = {
  zoom: 10,
};
type verticalKey = {
  verticalKey: string;
};
const EventSearch = ({ verticalKey }: verticalKey) => {
  const searchActions = useSearchActions();
  const filters = useSearchState((state) => state.filters.static);
  const [isLoading, setIsLoading] = useState(true);
  const [showFacets, setShowFacets] = useState(false);
  useEffect(() => {
    searchActions.setVertical(verticalKey);
    searchActions.executeVerticalQuery().then(() => setIsLoading(false));
  }, [searchActions]);

  const onDrag: OnDragHandler = React.useCallback(
    (center: LngLat, bounds: LngLatBounds) => {
      const radius = center.distanceTo(bounds.getNorthEast());
      const nonLocationFilters: SelectableStaticFilter[] =
        filters?.filter(
          (f) =>
            f.filter.kind !== "fieldValue" ||
            f.filter.fieldId !== "builtin.location"
        ) ?? [];
      const nearFilter: SelectableStaticFilter = {
        selected: true,
        displayName: "Near Current Area",
        filter: {
          kind: "fieldValue",
          fieldId: "builtin.location",
          matcher: Matcher.Near,
          value: { ...center, radius },
        },
      };
      searchActions.setStaticFilters([...nonLocationFilters, nearFilter]);
      searchActions.executeVerticalQuery();
    },
    [filters, searchActions]
  );

  return (
    <>
      <SearchBar />

      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="flex flex-row">
            <div
              className="flex flex-col w-2/5 p-4 overflow-scroll relative"
              style={{ height: "95vh" }}
            >
              <div
                className="hover:cursor-pointer px-4 py-1 text-sm bg-[#027da5] text-white w-fit"
                onClick={(e) => setShowFacets(!showFacets)}
              >
                Facets & Filters
              </div>
              {showFacets ? (
                <div className="absolute inset-0 bg-white h-[95vh]">
                  <Facets
                    customCssClasses={{ facetsContainer: "mr-10" }}
                    searchOnChange={true}
                  />
                  <div
                    className="hover:cursor-pointer px-4 py-1 mt-4 bg-[#027da5] text-white w-fit"
                    onClick={(e) => setShowFacets(!showFacets)}
                  >
                    Apply
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <ResultsCount />
                    <AppliedFilters />
                    <VerticalResults
                      CardComponent={EventCard}
                      customCssClasses={{
                        verticalResultsContainer: "flex flex-col gap-4",
                      }}
                    />
                    <Pagination />
                  </div>
                  <LocationBias
                    customCssClasses={{
                      locationBiasContainer: "flex flex-col",
                    }}
                  />
                </>
              )}
            </div>
            <div className=" w-3/5 h-screen">
              <MapboxMap
                mapboxOptions={{ zoom: 4 }}
                mapboxAccessToken={import.meta.env.YEXT_PUBLIC_MAP_API_KEY}
                PinComponent={MapPin}
                onDrag={onDrag}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventSearch;
