import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { ExternalLink, Search, BookOpen, Calendar, Users, Filter, SortAsc, SortDesc } from 'lucide-react';

const ResearchPapersTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJournal, setSelectedJournal] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedDecade, setSelectedDecade] = useState('all');
  const [sortBy, setSortBy] = useState('year');
  const [sortOrder, setSortOrder] = useState('desc');
  const itemsPerPage = 10;

  const { data: papers, isLoading, error } = useQuery({
    queryKey: ['research-papers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('research_papers')
        .select('*')
        .order('publication_year', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Get unique values for filters
  const uniqueJournals = papers ? [...new Set(papers.map(p => p.source_title).filter(Boolean))] : [];
  const uniqueYears = papers ? [...new Set(papers.map(p => p.publication_year).filter(Boolean))].sort((a, b) => b - a) : [];
  const decades = ['1980s', '1990s', '2000s', '2010s', '2020s'];

  const filteredPapers = papers?.filter(paper => {
    const matchesSearch = 
      paper.article_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.author_full_names.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (paper.source_title && paper.source_title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (paper.abstract && paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesJournal = selectedJournal === 'all' || paper.source_title === selectedJournal;
    const matchesYear = selectedYear === 'all' || paper.publication_year?.toString() === selectedYear;
    
    let matchesDecade = true;
    if (selectedDecade !== 'all') {
      const year = paper.publication_year;
      if (year) {
        const decadeStart = parseInt(selectedDecade.slice(0, 4));
        matchesDecade = year >= decadeStart && year < decadeStart + 10;
      } else {
        matchesDecade = false;
      }
    }
    
    return matchesSearch && matchesJournal && matchesYear && matchesDecade;
  }) || [];

  // Sort papers
  const sortedPapers = [...filteredPapers].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'year':
        comparison = (a.publication_year || 0) - (b.publication_year || 0);
        break;
      case 'title':
        comparison = a.article_title.localeCompare(b.article_title);
        break;
      case 'author':
        comparison = a.author_full_names.localeCompare(b.author_full_names);
        break;
      case 'journal':
        comparison = (a.source_title || '').localeCompare(b.source_title || '');
        break;
      default:
        comparison = 0;
    }
    
    return sortOrder === 'desc' ? -comparison : comparison;
  });

  const totalPages = Math.ceil(sortedPapers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  
  // Limit to maximum 10 pages
  const maxPages = Math.min(totalPages, 10);
  const paginatedPapers = sortedPapers.slice(startIndex, startIndex + itemsPerPage);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedJournal('all');
    setSelectedYear('all');
    setSelectedDecade('all');
    setSortBy('year');
    setSortOrder('desc');
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="p-12">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            <p className="text-slate-600 font-medium">Loading research papers...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="p-12">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <ExternalLink className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Error Loading Papers</h3>
              <p className="text-red-600">{error.message}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl text-slate-900">Research Papers Database</CardTitle>
              <p className="text-sm text-slate-600 mt-1">Comprehensive collection of Federal Reserve research</p>
            </div>
          </div>
          <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2">
            {sortedPapers.length} papers
          </Badge>
        </div>
        
        {/* Search Bar */}
        <div className="relative mt-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            placeholder="Search by title, author, journal, or abstract..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-12 h-12 text-base border-slate-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Advanced Filters */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">Advanced Filters</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="ml-auto text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              Clear All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600">Journal</label>
              <Select value={selectedJournal} onValueChange={setSelectedJournal}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="All Journals" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Journals</SelectItem>
                  {uniqueJournals.map(journal => (
                    <SelectItem key={journal} value={journal}>
                      {journal.length > 30 ? journal.substring(0, 30) + '...' : journal}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600">Publication Year</label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="All Years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {uniqueYears.map(year => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600">Decade</label>
              <Select value={selectedDecade} onValueChange={setSelectedDecade}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="All Decades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Decades</SelectItem>
                  {decades.map(decade => (
                    <SelectItem key={decade} value={decade}>{decade}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="year">Publication Year</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="author">Author</SelectItem>
                  <SelectItem value="journal">Journal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600">Order</label>
              <Button
                variant="outline"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="w-full h-10 justify-center"
              >
                {sortOrder === 'asc' ? (
                  <><SortAsc className="w-4 h-4 mr-2" /> Ascending</>
                ) : (
                  <><SortDesc className="w-4 h-4 mr-2" /> Descending</>
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead className="font-semibold text-slate-700 py-4">Research Paper</TableHead>
                <TableHead className="font-semibold text-slate-700 py-4">Authors</TableHead>
                <TableHead className="font-semibold text-slate-700 py-4">Journal</TableHead>
                <TableHead className="font-semibold text-slate-700 py-4 text-center">Year</TableHead>
                <TableHead className="font-semibold text-slate-700 py-4 text-center">Access</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedPapers.map((paper) => (
                <TableRow key={paper.id} className="hover:bg-blue-50/50 transition-colors">
                  <TableCell className="py-6">
                    <div className="max-w-md">
                      <h3 className="font-semibold text-slate-900 text-sm leading-tight mb-2">
                        {paper.article_title}
                      </h3>
                      {paper.abstract && (
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                          {paper.abstract.substring(0, 180)}...
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-6">
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700 leading-tight">
                        {paper.author_full_names}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-6">
                    <div className="max-w-xs">
                      <span className="text-sm font-medium text-slate-800 leading-tight">
                        {paper.source_title}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <Badge variant="outline" className="font-medium">
                        {paper.publication_year}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="py-6 text-center">
                    {paper.doi_link ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(paper.doi_link, '_blank')}
                        className="h-10 w-10 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    ) : (
                      <span className="text-slate-400 text-xs font-medium">N/A</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {maxPages > 1 && (
          <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedPapers.length)} of {sortedPapers.length} results
              </p>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:bg-blue-50'}
                    />
                  </PaginationItem>
                  {[...Array(maxPages)].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          onClick={() => setCurrentPage(pageNum)}
                          isActive={currentPage === pageNum}
                          className="cursor-pointer"
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(Math.min(maxPages, currentPage + 1))}
                      className={currentPage === maxPages ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:bg-blue-50'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResearchPapersTable;
