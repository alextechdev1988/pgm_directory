import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { SearchIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from './theme-provider';
import { mockData } from '../data/mockData';

type Record = {
  dept: string;
  process: string;
  output: string;
  pgm_name: string;
  program_desc: string;
  additional_notes: string;
  ifs_folder: string;
  user: string;
  hard_code: string;
}

const CsvViewer = () => {
  const [data] = useState<Record[]>(mockData);
  const [filteredData, setFilteredData] = useState<Record[]>(mockData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterColumn, setFilterColumn] = useState('all');
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const filtered = data.filter(record => {
      if (filterColumn === 'all') {
        return Object.values(record).some(value => 
          value.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return record[filterColumn as keyof Record]
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
    setFilteredData(filtered);
  }, [searchTerm, filterColumn, data]);

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-3xl font-bold">Excel Data Viewer</CardTitle>
            <CardDescription className="text-lg mt-2">
              Explore and filter your Excel data with ease
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <MoonIcon className="h-5 w-5" />
            ) : (
              <SunIcon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterColumn} onValueChange={setFilterColumn}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select column" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Columns</SelectItem>
              <SelectItem value="dept">Department</SelectItem>
              <SelectItem value="process">Process</SelectItem>
              <SelectItem value="output">Output</SelectItem>
              <SelectItem value="pgm_name">Program Name</SelectItem>
              <SelectItem value="program_desc">Program Description</SelectItem>
              <SelectItem value="additional_notes">Additional Notes</SelectItem>
              <SelectItem value="ifs_folder">IFS Folder</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="hard_code">Hard-Code</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dept</TableHead>
                <TableHead>Process</TableHead>
                <TableHead>Output</TableHead>
                <TableHead>Pgm Name</TableHead>
                <TableHead>Program Desc</TableHead>
                <TableHead>Additional Notes</TableHead>
                <TableHead>IFS Folder</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Hard-Code?</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{record.dept}</TableCell>
                    <TableCell>{record.process}</TableCell>
                    <TableCell>{record.output}</TableCell>
                    <TableCell className="font-mono">{record.pgm_name}</TableCell>
                    <TableCell>{record.program_desc}</TableCell>
                    <TableCell>{record.additional_notes}</TableCell>
                    <TableCell className="font-mono text-sm">{record.ifs_folder}</TableCell>
                    <TableCell>{record.user}</TableCell>
                    <TableCell>{record.hard_code}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center h-24">
                    No results found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CsvViewer;