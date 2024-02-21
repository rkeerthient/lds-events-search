import {
  Matcher,
  SelectableStaticFilter,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import {
  AppliedFilters,
  Coordinate,
  Facets,
  Geolocation,
  MapboxMap,
  MapboxMapProps,
  OnDragHandler,
  Pagination,
  ResultsCount,
  SearchBar,
  VerticalResults,
} from "@yext/search-ui-react";
import { LngLat, LngLatBounds } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as React from "react";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import EventCard from "./EventCard";
import Loader from "./Loader";
import MapPin from "./MapPin";
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
      <SearchBar placeholder="Search our Events" />

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
                  <IoIosClose
                    onClick={(e) => setShowFacets(false)}
                    className="ml-auto h-8 w-8 mr-4 hover:cursor-pointer hover:border"
                  />
                  <Facets
                    customCssClasses={{ facetsContainer: "mr-10" }}
                    searchOnChange={true}
                  />
                  <div className="flex flex-row gap-4 mb-8">
                    <div
                      className="hover:cursor-pointer px-4 py-1 mt-4 bg-[#027da5] text-white w-fit"
                      onClick={(e) => setShowFacets(!showFacets)}
                    >
                      Apply
                    </div>
                    <div
                      className="hover:cursor-pointer px-4 py-1 mt-4 text-[#027da5] w-fit hover:underline"
                      onClick={(e) => setShowFacets(false)}
                    >
                      Cancel
                    </div>
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
                    <div className="mt-4">
                      <Pagination />
                      <Geolocation
                        customCssClasses={{
                          iconContainer: "none",
                          geolocationContainer: "flex flex-col lg:flex-col",
                        }}
                      />
                    </div>
                  </div>
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
