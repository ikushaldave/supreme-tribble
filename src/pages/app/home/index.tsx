/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '@/hooks/useAuth';
import { DatePickerWithRange } from '@/components/date-picker-with-range';
import { useGetDataMutation, useGetDateRangeMutation } from '@/service/sigmoid';
import { setDateRange, setFullScreenLoading } from '@/reducer/commonSlice';
import { RootState } from '@/store';
import { addDays, subDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { Card } from '@/components/card';
import { BAR_CHART_PAYLOAD, PIE_CHART_PAYLOAD, TABLE_PAYLOAD, updatePayload } from './payload';
import { DataPayloadStructure, DateRangeType } from '@/interface/types';
import { Skeleton } from '@/components/skeleton';
import { Bar, Pie } from 'react-chartjs-2';
import { getKeys, getMappedValue } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table';
import { Input } from '@/components/input';

type RenderDataProps = {
  dateRange: DateRangeType;
  payload: DataPayloadStructure;
};

const Components = [
  {
    Element: RenderTable,
    payload: TABLE_PAYLOAD,
    id: RenderTable.name
  },
  {
    Element: RenderBar,
    payload: BAR_CHART_PAYLOAD,
    id: RenderBar.name
  },
  {
    Element: RenderPie,
    payload: PIE_CHART_PAYLOAD,
    id: RenderPie.name
  }
];

function RenderTable({ dateRange, payload }: RenderDataProps) {
  const [searchValue, setSearchValue] = useState<string>('');
  const [getTableData, { isLoading, data: tableData }] = useGetDataMutation();

  useEffect(() => {
    getTableData(payload);
  }, [dateRange]);

  if (isLoading || !tableData) {
    return <Skeleton className="w-full h-full" />;
  }

  const data =
    searchValue.trim().length > 2
      ? tableData.result.data.filter((item) =>
          (item.publisherId as string).toLowerCase().includes(searchValue.toLowerCase())
        )
      : tableData.result.data;
  const headers = data.length ? getKeys(tableData.result.data[0]) : [];

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchValue(event.target.value);

  return (
    <div className="max-h-[500px] overflow-y-auto">
      <div className="flex my-4 mx-2">
        <Input
          placeholder="Enter 3 char to search..."
          className="w-96"
          value={searchValue}
          onChange={onChange}
        />
      </div>
      <Table className=" ">
        <TableHeader>
          <TableRow>
            {headers.map((item) => (
              <TableHead key={item}>{item}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow>
              {headers.map((content) => (
                <TableCell>{item[content] as string}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function RenderBar({ dateRange, payload }: RenderDataProps) {
  const [getBarData, { isLoading, data: barChartData }] = useGetDataMutation();

  useEffect(() => {
    getBarData(payload);
  }, [dateRange]);

  if (isLoading || !barChartData) {
    return <Skeleton className="w-full h-full" />;
  }

  const labels = getMappedValue(barChartData?.result.data, 'appSiteId');
  const data = getMappedValue(barChartData?.result.data, 'impressions_offered');

  return (
    <Bar
      width="100%"
      height="100%"
      options={{ maintainAspectRatio: false }}
      data={{
        labels: labels,
        datasets: [
          {
            label: 'Bar Chart',
            data,
            borderWidth: 1
          }
        ]
      }}
    />
  );
}

function RenderPie({ dateRange, payload }: RenderDataProps) {
  const [getPieData, { isLoading, data: pieChartData }] = useGetDataMutation();

  useEffect(() => {
    getPieData(payload);
  }, [dateRange]);

  useEffect(() => {}, [dateRange]);

  if (isLoading || !pieChartData) {
    return <Skeleton className="w-full h-full" />;
  }

  const labels = getMappedValue(pieChartData?.result.data, 'advertiserId');
  const data = getMappedValue(pieChartData?.result.data, 'CM001');

  return (
    <Pie
      width="100%"
      height="100%"
      options={{ maintainAspectRatio: false }}
      data={{
        labels: labels,
        datasets: [
          {
            label: 'Bar Chart',
            data,
            borderWidth: 1
          }
        ]
      }}
    />
  );
}

const RenderData = () => {
  const { user } = useAuth();
  const dateRange = useSelector((state: RootState) => state.common.dateRange);

  if (!dateRange) {
    return null;
  }

  return Components.map((Component) => (
    <Card className="w-full min-h-[500px] p-4" key={Component.id}>
      <Component.Element
        payload={updatePayload(Component.payload, {
          emailId: user?.email || '',
          orgViewReq: { organization: user?.userOrg || '', view: 'Auction' },
          dateRange: { startDate: dateRange.from, endDate: dateRange.to }
        })}
        dateRange={dateRange}
      />
    </Card>
  ));
};

const Home = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const dateRange = useSelector((state: RootState) => state.common.dateRange);
  const [getDateRange, { isLoading: isDateRangeLoading }] = useGetDateRangeMutation();
  const disabledRange = useRef<Array<DateRange>>([]);

  useEffect(() => {
    if (!dateRange && user) {
      dispatch(setFullScreenLoading(true));

      getDateRange({
        organization: user?.userOrg,
        view: 'Auction'
      })
        .unwrap()
        .then((data) => {
          const { startDate, endDate } = data?.result as { startDate: string; endDate: string };
          const from = new Date(Number(startDate));
          const to = new Date(Number(endDate));

          dispatch(
            setDateRange({
              from: startDate,
              to: endDate
            })
          );

          dispatch(setFullScreenLoading(false));

          disabledRange.current = [
            {
              from: new Date(0),
              to: subDays(from, 1)
            },
            { from: addDays(to, 1), to: new Date() }
          ];
        });
    }
  }, [dateRange]);

  if (!dateRange || isDateRangeLoading) return null;

  return (
    <div>
      <div>
        <DatePickerWithRange
          date={{
            from: new Date(Number(dateRange.from)),
            to: new Date(Number(dateRange.to))
          }}
          onSelect={(range: any) => {
            dispatch(
              setDateRange({
                from: String(range.from?.getTime() || ''),
                to: String(range.to?.getTime() || '')
              })
            );
          }}
          CalendarProps={{ showOutsideDays: false, disabled: disabledRange.current }}
        />
      </div>
      <div className="flex flex-wrap gap-4 my-5">
        <RenderData />
      </div>
    </div>
  );
};

export default Home;
